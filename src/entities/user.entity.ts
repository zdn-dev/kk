import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '64', nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: '64', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: '13', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: string;
}
