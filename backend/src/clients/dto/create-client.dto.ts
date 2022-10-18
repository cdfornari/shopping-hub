import { IsDate, IsEmail, IsString, Matches, MaxLength, MinLength  } from 'class-validator';

export class CreateClientDto {

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
    @MaxLength(40)
    fullName: string;

    @IsString()
    @Matches(/^[V|E|J|P][0-9]{5,9}$/, {message: 'documento de identificacion invalido'})
    dni: string;

    @IsString()
    @Matches(/^(414|424|412|416|426)[0-9]{7}$/g, {message: 'numero de telefono invalido'})
    phoneNumber: string;
    
}
