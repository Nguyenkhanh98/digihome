import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { EntityStatus } from '@common/constants/entity-status';
import { TemplateEntity } from './template.entity';

@Entity({
  name: 'designs',
})
export class DesignEntity extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  metadata: string;

  @Column({ nullable: true })
  templateId: string;

  @Column({ nullable: true })
  data: string;

  @Column({ default: EntityStatus.Active })
  status: EntityStatus;

  @OneToOne(() => TemplateEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  template: TemplateEntity;
}
