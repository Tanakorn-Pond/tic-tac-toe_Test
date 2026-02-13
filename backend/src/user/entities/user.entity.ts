import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'user_name', type: 'varchar', length: 50 })
  userName: string;

  @Column({ name: 'user_password', type: 'varchar', length: 255 })
  userPassword: string;
}
