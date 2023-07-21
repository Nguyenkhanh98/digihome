import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { ModelEntity } from '@common/entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TemplateEntity } from '@common/entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity, TemplateEntity])],
  controllers: [ModelController],
  providers: [ModelService, JwtService],
})
export class ModelModule {}
