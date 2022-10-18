import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles, ValidRolesArray } from '../types/valid-roles.type';

@Schema()
export class User extends Document {

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    })
    email: string;

    @Prop({
        type: String,
        required: true
    })
    password: string;

    @Prop({
        required: true,
        enum: ValidRolesArray
    })
    role: ValidRoles;

    @Prop({
        type: Boolean,
        required: true,
        default: true
    })
    isActive: boolean;
    
}

export const UserSchema = SchemaFactory.createForClass(User);