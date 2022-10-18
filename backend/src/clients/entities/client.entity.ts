import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Client extends Document{

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    user: Types.ObjectId;

    @Prop({
        type: [Types.ObjectId],
        default: [],
        ref: 'Order'
    })
    orders: Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    fullName: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
    dni: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
    phoneNumber: string;

}

export const ClientSchema = SchemaFactory.createForClass(Client);