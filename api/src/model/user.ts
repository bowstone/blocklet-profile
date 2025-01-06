import { IsEmail, IsNumber, IsPhoneNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  @IsNumber()
  id?: number;

  @Column({ type: 'text', length: 100 })
  userName: string;

  @Column({ type: 'text', length: 100 })
  @IsEmail()
  email: string;

  @Column({ type: 'text', length: 50 })
  @IsPhoneNumber('CN')
  phoneNumber: string;
}
