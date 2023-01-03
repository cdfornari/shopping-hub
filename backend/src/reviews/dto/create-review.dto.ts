import { IsNotEmpty, IsNumber, IsString, Max, Min, IsMongoId } from 'class-validator';

export class CreateReviewDto {

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsMongoId()
    productId: string;

    @IsMongoId()
    orderId: string;

}