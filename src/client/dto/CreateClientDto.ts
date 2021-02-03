/* eslint-disable prettier/prettier */
import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
