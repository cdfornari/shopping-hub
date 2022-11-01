import { IsIn, IsMongoId, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Size, ValidSizes } from 'src/products/types/size';

export class OrderProductDto {

    @IsString()
    @IsMongoId()
    product: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsString()
    @IsIn(ValidSizes)
    @IsOptional()
    size: Size;

    @IsNumber()
    @IsOptional()
    shoeSize: number;
}