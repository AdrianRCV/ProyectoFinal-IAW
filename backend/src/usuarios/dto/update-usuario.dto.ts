import { IsString, IsEmail, IsNotEmpty,MinLength } from 'class-validator';

export class CreateUsuarioDto {
    @IsString() @IsNotEmpty()
    username: string;
    @IsEmail() @IsNotEmpty()
    email: string;
    @IsString() @IsNotEmpty()@MinLength(6,{message: "La contraseña debe tener como minimo 6 caractéres"})
    password: string;
}