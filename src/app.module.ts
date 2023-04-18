import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorModule } from './modules/author/author.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      database: 'imtixon',
      host: 'localhost',
      password: 'zeten1122',
      port: 5432,
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    AuthorModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
