import { AppRoles } from '@common/constants/role';
import { UserEntity } from '@common/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class InitSuperAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const superAdmin = await connection
      .getRepository(UserEntity)
      .findOne({ where: { role: AppRoles.SUPER_ADMIN } });

    if (superAdmin) {
      console.log('Super admin already seeded.');
      return;
    }

    const newUser = new UserEntity();
    newUser.email = 'nhkhanh1998@gmail.com';
    newUser.password = 'abc123';
    await newUser.save();
    // const user = await factory(UserEntity)({
    //   email: 'nhkhanh1998@gmail.com',
    //   password: 'abc123',
    // }).seed();
    console.log('Super admin seeded:', newUser);
    // await factory(UserEntity)().createMany(10);
  }
}
