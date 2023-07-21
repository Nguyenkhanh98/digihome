import { ModelEntity } from '@common/entities/model.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto, UpdateModelDto } from './model.dto';
import { EntityStatus } from '@common/constants/entity-status';
import { AppException } from '@common/exceptions/app-exception';
import { MODEL_NOT_FOUND, TEMPLATE_NOT_FOUND } from '@common/exceptions/error';
import { TemplateEntity } from '@common/entities/template.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private readonly modelRepository: Repository<ModelEntity>,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async getAll(isPubic: boolean) {
    const result = await this.modelRepository.find({
      where: isPubic ? { status: EntityStatus.Active } : undefined,
      loadRelationIds: true,
    });
    return result;
  }

  async getById(id: string) {
    const result = await this.modelRepository.findOne({
      where: { id },
      relations: ['template'],
    });
    return result;
  }

  async create(data: CreateModelDto) {
    if (data.templateId) {
      const findTemplate = await this.templateRepository.findOne({
        where: { id: data.templateId, status: EntityStatus.Active },
      });

      if (!findTemplate) {
        throw new AppException(TEMPLATE_NOT_FOUND);
      }
    }

    const createData = this.modelRepository.create({
      ...data,
    });

    return createData.save();
  }

  async update(id: string, dataUpdate: UpdateModelDto) {
    const findModel = await this.modelRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(MODEL_NOT_FOUND);
    }

    if (dataUpdate.templateId) {
      const findTemplate = await this.templateRepository.findOne({
        where: { id: dataUpdate.templateId, status: EntityStatus.Active },
      });

      if (!findTemplate) {
        throw new AppException(TEMPLATE_NOT_FOUND);
      }
    }

    const updateModel = this.modelRepository.create({
      ...findModel,
      ...dataUpdate,
    });

    return await updateModel.save();
  }

  async delete(id: string) {
    const findModel = await this.modelRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(MODEL_NOT_FOUND);
    }

    await this.modelRepository.update(findModel.id, {
      status: EntityStatus.Disable,
    });

    return true;
  }
}
