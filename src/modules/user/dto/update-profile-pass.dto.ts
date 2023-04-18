import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
