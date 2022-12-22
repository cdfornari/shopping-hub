import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema({
    versionKey: false,
})
export class Client extends Document{

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    user: User;

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