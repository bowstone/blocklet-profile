import { IsEmail, IsNumber, IsPhoneNumber } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  @IsNumber()
  id?: number;

  @Column()
  userName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsPhoneNumber()
  phoneNumber: string;
}
