import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-profile-data.dto';
import { UpdateUserPasswordDto } from './dto/update-profile-pass.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    schema: {
      example:{
        id: 'number',
        firstname: "string",
        lastname: "string",
        phone: "string",
        email: "string",
        password: "string",
        created_at: "string"
      }
    }
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse(
    {
      schema: {
        example:{
          id: 'number',
          firstname: "string",
          lastname: "string",
          phone: "string",
          email: "string",
          password: "string",
          created_at: "string"
        }
      }
    }
  )
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateProfileData(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: Request,
  ) {
    return this.userService.updateProfileData(+id, updateUserDto, req);
  }

  @Patch(':id/password')
  updateProfilePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
    @Request() req: Request,
  ) {
    return this.userService.updateProfilePassword(+id, updateUserDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
