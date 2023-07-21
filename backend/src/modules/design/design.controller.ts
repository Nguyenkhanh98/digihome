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
import { DesignService } from './design.service';
import { Auth } from '@common/decorators/Auth.decorator';
import { UseRoles } from 'nest-access-control';
import { AppResource } from '@common/constants/resource';
import { CreateDesignDto, UpdateDesignDto } from './design.dto';

@ApiTags('Design')
@Controller('/design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Get()
  @Auth()
  @UseRoles({
    resource: AppResource.DESIGN,
    action: 'read',
    possession: 'own',
  })
  async getDesigns() {
    return this.designService.getAll(false);
  }

  @Get('/public')
  async getPublicDesigns() {
    return this.designService.getAll(true);
  }

  @Get('/:id')
  async getDesignInfo(@Param('id') id: string) {
    return this.designService.getById(id);
  }

  @Post()
  @Auth()
  @UseRoles({
    resource: AppResource.DESIGN,
    action: 'create',
    possession: 'own',
  })
  async createDesign(@Body() createData: CreateDesignDto) {
    return this.designService.create(createData);
  }

  @Put('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.DESIGN,
    action: 'update',
    possession: 'own',
  })
  async updateDesign(
    @Param('id') id: string,
    @Body() updateData: UpdateDesignDto,
  ) {
    return this.designService.update(id, updateData);
  }

  @Delete('/:id')
  @Auth()
  @UseRoles({
    resource: AppResource.DESIGN,
    action: 'delete',
    possession: 'own',
  })
  async deleteDesign(@Param('id') id: string) {
    return this.designService.delete(id);
  }
}
