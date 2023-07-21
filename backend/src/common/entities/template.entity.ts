import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { EntityStatus } from '@common/constants/entity-status';
import { ModelEntity } from './model.entity';

@Entity({
  name: 'templates',
})
export class TemplateEntity extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  metadata: string;

  @Column({ default: EntityStatus.Active })
  status: EntityStatus;

  @OneToMany(() => ModelEntity, (model) => model.template, {
    createForeignKeyConstraints: false,
  })
  models: ModelEntity[];
}
