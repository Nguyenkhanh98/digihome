import { AppResource } from '@common/constants/resource';
import { Auth } from '@common/decorators/Auth.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateModelDto, UpdateModelDto } from './model.dto';
import { ModelService } from './model.service';
import { UseRoles } from 'nest-access-control';

@ApiTags('Model')
@Controller('/model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  @Auth()
  @UseRoles({
    resource: AppResource.MODEL,
    action: 'read',
    possession: 'own',
  })
  async getModels() {
    return this.modelService.getAll(false);
  }

  @Get('/public')
  async getPublicModels() {
    return this.modelService.getAll(true);
  }

  @Get('/:id')
  async getModelInfo(@Param('id') id: string) {
    return this.modelService.getById(id);
  }

  @Post()
  @Auth()
  @UseRoles({
    resource: AppResource.MODEL,
    action: 'create',
    possession: 'own',
  })
  async createModel(@Body() createData: CreateModelDto) {
    return this.modelService.create(createData);
  }

  @Put('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.MODEL,
    action: 'update',
    possession: 'own',
  })
  async updateModel(
    @Param('id') id: string,
    @Body() updateData: UpdateModelDto,
  ) {
    return this.modelService.update(id, updateData);
  }

  @Delete('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.MODEL,
    action: 'delete',
    possession: 'own',
  })
  async deleteModel(@Param('id') id: string) {
    return this.modelService.delete(id);
  }
}
