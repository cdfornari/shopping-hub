import { IsEmail, IsString, Matches, Min } from 'class-validator';

export class LoginDto{

    @IsString()
    @IsEmail({message: 'email invalido'})
    email: string;

    @IsString()
    @Min(8,{message: 'La contraseña debe tener al menos 8 caracteres'})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

}