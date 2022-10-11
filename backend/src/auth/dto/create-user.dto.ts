import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ValidRoles, ValidRolesArray } from '../types/valid-roles.type';

export class CreateUserDto {

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
    @IsIn(ValidRolesArray)
    role: ValidRoles;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

}