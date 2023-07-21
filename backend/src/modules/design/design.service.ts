import { EntityStatus } from '@common/constants/entity-status';
import { DesignEntity } from '@common/entities/design.entity';
import { TemplateEntity } from '@common/entities/template.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesignDto, UpdateDesignDto } from './design.dto';
import { AppException } from '@common/exceptions/app-exception';
import { DESIGN_NOT_FOUND, TEMPLATE_NOT_FOUND } from '@common/exceptions/error';

@Injectable()
export class DesignService {
  constructor(
    @InjectRepository(DesignEntity)
    private readonly designRepository: Repository<DesignEntity>,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async getAll(isPubic: boolean) {
    const result = await this.designRepository.find({
      where: isPubic ? { status: EntityStatus.Active } : undefined,
      loadRelationIds: true,
    });
    return result;
  }

  async getById(id: string) {
    const result = await this.designRepository.findOne({
      where: { id },
      relations: ['template'],
    });
    return result;
  }

  async create(data: CreateDesignDto) {
    if (data.templateId) {
      const findTemplate = await this.templateRepository.findOne({
        where: { id: data.templateId, status: EntityStatus.Active },
      });

      if (!findTemplate) {
        throw new AppException(TEMPLATE_NOT_FOUND);
      }
    }

    const createData = this.designRepository.create({
      ...data,
    });

    return createData.save();
  }

  async update(id: string, dataUpdate: UpdateDesignDto) {
    const findModel = await this.designRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(DESIGN_NOT_FOUND);
    }

    if (dataUpdate.templateId) {
      const findTemplate = await this.templateRepository.findOne({
        where: { id: dataUpdate.templateId, status: EntityStatus.Active },
      });

      if (!findTemplate) {
        throw new AppException(TEMPLATE_NOT_FOUND);
      }
    }

    const updateModel = this.designRepository.create({
      ...findModel,
      ...dataUpdate,
    });

    return await updateModel.save();
  }

  async delete(id: string) {
    const findModel = await this.designRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(DESIGN_NOT_FOUND);
    }

    await this.designRepository.update(findModel.id, {
      status: EntityStatus.Disable,
    });

    return true;
  }
}
