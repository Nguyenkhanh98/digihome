import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { EntityStatus } from '@common/constants/entity-status';
import { TemplateEntity } from './template.entity';

@Entity({
  name: 'models',
})
export class ModelEntity extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  metadata: string;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  templateId: string;

  @Column({ default: EntityStatus.Active })
  status: EntityStatus;

  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => TemplateEntity, (template) => template.models, {
    createForeignKeyConstraints: false,
  })
  template: TemplateEntity;
}
