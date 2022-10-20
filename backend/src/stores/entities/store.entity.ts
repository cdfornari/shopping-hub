import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Store {

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    name: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: Types.ObjectId;

    @Prop({
        type: [Types.ObjectId],
        ref: 'Product',
        required: true,
        default: []
    })
    products: Types.ObjectId[];

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    rif: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    logo: string;
}