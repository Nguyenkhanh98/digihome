import { EntityStatus } from '@common/constants/entity-status';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateModelDto {
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

  @ApiProperty()
  @IsOptional()
  @IsString()
  data: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  templateId: string;
}

export class UpdateModelDto extends CreateModelDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(EntityStatus)
  type: EntityStatus;
}
