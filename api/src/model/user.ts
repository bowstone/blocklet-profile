import { IsEmail, IsNumber, IsPhoneNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @Column()
  userName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsPhoneNumber('CN')
  phoneNumber: string;
}
