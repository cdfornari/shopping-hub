import { IsNumber, Max, Min } from 'class-validator';

export class ShoeSizeDto {

    @IsNumber()
    @Min(5)
    @Max(13)
    size: number;

    @IsNumber()
    @Min(0)
    stock: number;

}