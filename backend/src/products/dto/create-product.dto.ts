import { IsArray, IsIn, IsNumber, IsOptional, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';
import { Category, ValidCategories } from '../types/category';
import { Gender, ValidGenders } from '../types/gender';
import { Size, ValidSizes } from '../types/size';

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

    @IsString()
    @IsUrl()
    image: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @IsIn(ValidSizes, { each: true })
    sizes?: Size[];

    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    @Min(6, { each: true })
    @Max(13, { each: true })
    shoeSizes?: number[];
    
}