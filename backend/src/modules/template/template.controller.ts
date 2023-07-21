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
import { TemplateService } from './template.service';
import { Auth } from '@common/decorators/Auth.decorator';
import { UseRoles } from 'nest-access-control';
import { AppResource } from '@common/constants/resource';
import { CreateTemplateDto, UpdateTemplateDto } from './template.dto';

@ApiTags('Template')
@Controller('/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Auth()
  @UseRoles({
    resource: AppResource.TEMPLATE,
    action: 'read',
    possession: 'own',
  })
  async getTemplates() {
    return this.templateService.getAll(false);
  }

  @Get('/public')
  async getPublicTemplates() {
    return this.templateService.getAll(true);
  }

  @Get('/:id')
  async getTemplateInfo(@Param('id') id: string) {
    return this.templateService.getById(id);
  }

  @Post()
  @Auth()
  @UseRoles({
    resource: AppResource.TEMPLATE,
    action: 'create',
    possession: 'own',
  })
  async createTemplate(@Body() createData: CreateTemplateDto) {
    return this.templateService.create(createData);
  }

  @Put('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.MODEL,
    action: 'update',
    possession: 'own',
  })
  async updateTempate(
    @Param('id') id: string,
    @Body() updateData: UpdateTemplateDto,
  ) {
    return this.templateService.update(id, updateData);
  }

  @Delete('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.TEMPLATE,
    action: 'delete',
    possession: 'own',
  })
  async deleteTemplate(@Param('id') id: string) {
    return this.templateService.delete(id);
  }
}
