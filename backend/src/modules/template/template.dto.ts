import { EntityStatus } from '@common/constants/entity-status';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  metadata: string;
}

export class UpdateTemplateDto extends CreateTemplateDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(EntityStatus)
  status: EntityStatus;
}
