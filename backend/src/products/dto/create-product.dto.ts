import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsObject, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';
import { Category, ValidCategories } from '../types/category';
import { Gender, ValidGenders } from '../types/gender';
import { Size } from '../types/size';
import { ShoeSizeDto } from './shoe-size.dto';
import { SizeDto } from './size.dto';

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNumber()
    @Min(1)
    price: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    comparativePrice?: number;

    @IsString()
    @IsIn(ValidCategories)
    category: Category;

    @IsString()
    @IsIn(ValidGenders)
    gender: Gender;

    @IsArray()
    @IsOptional()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => SizeDto)
    sizes?: {size: Size, stock: number}[];

    @IsArray()
    @IsOptional()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => ShoeSizeDto)
    shoeSizes?: {size: number, stock: number}[];
    
}