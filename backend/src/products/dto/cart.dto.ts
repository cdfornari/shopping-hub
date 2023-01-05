import { IsArray, IsMongoId } from 'class-validator';

export class CartDto {

    @IsArray()
    @IsMongoId({ each: true })
    products: string[]

}