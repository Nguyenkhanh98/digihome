import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateEntity } from '@common/entities/template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '@common/entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity, ModelEntity])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
