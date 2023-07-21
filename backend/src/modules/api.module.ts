import { RoleBuilder } from '@common/config/access-control.builder';
import { UserEntity } from '@common/entities/user.entity';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ACGuard, AccessControlModule } from 'nest-access-control';
import { AuthModule } from './auth/auth.module';
import { DesignModule } from './design/design.module';
import { AuthGuard } from '../common/guards/auth.guard';
import { ModelModule } from './model/model.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
    AccessControlModule.forRoles(RoleBuilder),
    DesignModule,
    ModelModule,
    TemplateModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
    JwtService,
  ],
})
export class ApiModule {}
