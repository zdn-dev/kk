import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  country: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
