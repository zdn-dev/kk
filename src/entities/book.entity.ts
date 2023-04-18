import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '150', nullable: false })
  title: string;

  @Column({ type: 'int4', nullable: false })
  pages: number;

  @Column({ type: 'int4', nullable: false })
  year: number;

  @Column({ type: 'varchar', nullable: false })
  price: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  userId?: string;

  @ManyToMany(() => Author, (author) => author.books)
  authors?: Author[];
}
