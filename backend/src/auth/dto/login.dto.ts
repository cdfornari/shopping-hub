import { IsEmail, IsString, Matches, Min } from 'class-validator';

export class LoginDto{

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Min(8)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

}