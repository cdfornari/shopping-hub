import { Type } from 'class-transformer';
import { IsArray, IsIn, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { Size } from 'src/products/types/size';
import { PaymentMethod, ValidPaymentMethods } from '../types/payment-method';
import { Status, ValidStatus } from '../types/status';
import { OrderProductDto } from './order-product.dto';

export class CreateOrderDto {

    @IsString()
    @MinLength(5)
    address: string;

    @IsString()
    @MinLength(3)
    state: string;

    @IsString()
    @MinLength(3)
    city: string;

    @IsString()
    @IsIn(ValidPaymentMethods)
    paymentMethod: PaymentMethod;

    @IsString()
    @MinLength(9)
    refCode: string;

    @IsString()
    @IsIn(ValidStatus)
    status: Status;

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products: {
        product: string;
        quantity: number;
        size?: Size;
        shoeSize?: number;
    }[];

}
