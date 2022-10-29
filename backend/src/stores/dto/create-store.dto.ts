import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateStoreDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @Matches(/^[JGVEP][-][0-9]{8}[-][0-9]{1}$/, {message: 'rif invalido'})
    rif: string;

    @IsString()
    @Matches(/^(0414|0424|0412|0416|0426)[0-9]{7}$/, {message: 'numero de telefono invalido'})
    phoneNumber: string;

}
