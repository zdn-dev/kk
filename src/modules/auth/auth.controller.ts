import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuards } from './guards/local.guard';
import { Request } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Req() req: Request, @Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @UseGuards(LocalGuards)
  @Post('signin')
  signin(@Req() req: Request, @Body() body: any) {
    return req.user;
  }
}
