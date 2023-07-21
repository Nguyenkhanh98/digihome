import { EntityStatus } from '@common/constants/entity-status';
import { TemplateEntity } from '@common/entities/template.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto';
import { AppException } from '@common/exceptions/app-exception';
import { TEMPLATE_NOT_FOUND } from '@common/exceptions/error';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async getAll(isPubic: boolean) {
    const result = await this.templateRepository.find({
      where: isPubic ? { status: EntityStatus.Active } : undefined,
      loadRelationIds: true,
    });
    return result;
  }

  async getById(id: string) {
    const result = await this.templateRepository.findOne({
      where: { id },
      relations: ['models'],
    });
    return result;
  }

  async create(data: CreateTemplateDto) {
    const createData = this.templateRepository.create({
      ...data,
    });

    return createData.save();
  }

  async update(id: string, dataUpdate: UpdateTemplateDto) {
    const findModel = await this.templateRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(TEMPLATE_NOT_FOUND);
    }

    const updateModel = this.templateRepository.create({
      ...findModel,
      ...dataUpdate,
    });

    return await updateModel.save();
  }

  async delete(id: string) {
    const findModel = await this.templateRepository.findOne({ where: { id } });

    if (!findModel) {
      throw new AppException(TEMPLATE_NOT_FOUND);
    }

    await this.templateRepository.update(findModel.id, {
      status: EntityStatus.Disable,
    });

    return true;
  }
}
