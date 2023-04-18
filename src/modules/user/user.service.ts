import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-profile-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/update-profile-pass.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    this.userRepo.save(user);
    return user;
  }

  async findAll() {
    return (await this.userRepo.find()).filter((e) => delete e.password);
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async updateProfileData(
    id: number,
    updateUserDto: UpdateUserDto,
    req: Request,
  ) {
    // @ts-ignore
    const { userId } = this.jwtService.verify(req.headers.authorization);
    if (userId == id) {
      await this.userRepo.update({ id }, updateUserDto);
      return await this.userRepo.findOneBy({ id });
    }
    throw new UnauthorizedException();
  }

  async updateProfilePassword(
    id: number,
    updateUserDto: UpdateUserPasswordDto,
    req: Request,
  ) {
    // @ts-ignore
    const { userId } = this.jwtService.verify(req.headers.authorization);

    if (userId == id) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      await this.userRepo.update({ id }, { password: hash });
      const user = await this.userRepo.findOneBy({ id });
      delete user.password;
      return user;
    }
    throw new UnauthorizedException();
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }
}
