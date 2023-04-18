import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(body: CreateUserDto) {
    const hash = await bcrypt.hash(body.password, 10);
    delete body.password;
    const newUser = { ...body, password: hash };
    const user = this.userRepo.create(newUser);
    this.userRepo.save(user);
    const token = this.jwtService.sign({ userId: user.id });
    return { access_token: token };
  }

  async validateUser(email, password) {
    const userFromDb = await this.userRepo.findOne({ where: { email } });
    if (!userFromDb)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const isValidPass = await bcrypt.compare(password, userFromDb.password);

    if (isValidPass) {
      const accessToken = await this.jwtService.sign({ userId: userFromDb.id });
      delete userFromDb.password
      return { token: accessToken, user: userFromDb };
    } else {
      throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
    }
  }
}
