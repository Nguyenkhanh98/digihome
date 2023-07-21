import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor() {}

  @Get('health')
  async checkHealth() {
    return 'OK';
  }
}
