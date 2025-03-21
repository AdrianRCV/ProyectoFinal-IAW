import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
