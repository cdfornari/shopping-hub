import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Client } from 'src/clients/entities/client.entity';

@Schema({
    versionKey: false,
})
export class Review extends Document{

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Client',
    })
    client: Client;

    @Prop({
        type: Number,
        required: true,
        min: 1,
        max: 5,
    })
    rating: number;

    @Prop({
        type: String,
        required: true,
    })
    comment: string;

}

export const ReviewSchema = SchemaFactory.createForClass(Review);