import { CustomConfigModule } from '@common/config/config.module';
import { AppDataSource } from '@common/config/datasource.config';
import { ApiModule } from '@module/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        return AppDataSource.options;
      },
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
