import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { DesignEntity } from '@common/entities/design.entity';
import { TemplateEntity } from '@common/entities/template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DesignEntity, TemplateEntity])],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
