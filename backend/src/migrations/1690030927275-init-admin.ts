import { UserEntity } from '@common/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminSeed } from '../seeds/init-admin.seed';

export class InitAdmin1690030927275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(AdminSeed.password, salt);
    await queryRunner.query(
      `INSERT INTO users ("role", email, password) VALUES ('${AdminSeed.role}', '${AdminSeed.name}', '${password}')`,
    );
    console.log('Data inserted successfully using raw SQL query.');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
