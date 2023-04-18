import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../entities/author.entity';
import { In, Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}
  create(createAuthorDto: CreateAuthorDto, file: Express.Multer.File) {
    const author = this.authorRepo.create({
      ...createAuthorDto,
      image: file.filename,
    });
    this.authorRepo.save(author);
    return author;
  }

  findAll() {
    return this.authorRepo.find();
  }

  async findOne(id: number, body: any) {
    const author = await this.authorRepo.findOneBy({ id });
    const books = await this.bookRepo.findBy({ id: In(body.books) });

    author.books = books;
    this.authorRepo.save(author);
    return author;
  }

  async findOneAuthor(id: number) {
    const author = this.authorRepo.findOne({
      where: { id },
      relations: { books: true },
    });

    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return this.authorRepo.delete({ id });
  }
}
