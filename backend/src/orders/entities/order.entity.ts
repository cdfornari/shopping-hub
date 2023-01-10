import { Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from 'src/clients/entities/client.entity';
import { Status, ValidStatus } from '../types/status';
import { Product } from 'src/products/entities/product.entity';
import { PaymentMethod, ValidPaymentMethods } from '../types/payment-method';
import { ValidSizes } from '../../products/types/size';

@Schema({
    versionKey: false,
})
export class Order {

    @Prop({
        type: String,
        required: true,
    })
    address: string;

    @Prop({
        type: String,
        required: true,
    })
    state: string;

    @Prop({
        type: String,
        required: true,
    })
    city: string;

    @Prop({
        type: String,
        required: true,
        enum: ValidPaymentMethods
    })
    paymentMethod: PaymentMethod;

    @Prop({
        type: String,
        required: true,
    })
    refCode: string;

    @Prop({
        type: Number,
        required: true,
    })
    total: number

    @Prop({
        type: String,
        enum: ValidStatus,
        default: 'pending'
    })
    status: Status;

    @Prop({
        type: [
            raw({
                product: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: true,
                    autopopulate: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                },
                size: {
                    type: String,
                    enum: ValidSizes
                },
                shoeSize: {
                    type: Number
                },
                isReviewed: {
                    type: Boolean,
                    default: false
                }
            })
        ],
        required: true
    })
    products: {
        product: Product,
        quantity: number,
        size?: string,
        shoeSize?: number
        isReviewed: boolean
    }[]

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Client',
        autopopulate: true,
    })
    client: Client
}

export const orderSchema = SchemaFactory.createForClass(Order);
