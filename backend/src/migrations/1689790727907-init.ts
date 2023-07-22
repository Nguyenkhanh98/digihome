import { UserEntity } from '@common/entities/user.entity';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { AdminSeed } from '../seeds/init-admin.seed';

export class Init1689790727907 implements MigrationInterface {
  name = 'Init1689790727907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(UserEntity).save(AdminSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
