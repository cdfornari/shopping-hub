import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema({
    versionKey: false,
})
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
        required: true,
    })
    user: User;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true
    })
    rif: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    logo: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
    phoneNumber: string;
    
}

export const StoreSchema = SchemaFactory.createForClass(Store);