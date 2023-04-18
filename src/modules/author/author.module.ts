import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../../entities/author.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from 'src/middlewares/checkToken';
import { Book } from '../../entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
    JwtModule.register({ secret: 'olma' }),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/authors');
  }
}
