import { IsIn, IsNumber, IsString, Min } from 'class-validator';
import { ValidSizes } from '../types/size';

export class SizeDto {

    @IsString()
    @IsIn(ValidSizes)
    size: string;

    @IsNumber()
    @Min(0)
    stock: number;
    
}