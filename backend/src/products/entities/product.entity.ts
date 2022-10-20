import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ValidCategories } from '../types/category';
import { ValidGenders } from '../types/gender';
import { Size, ValidSizes } from '../types/size';

@Schema()
export class Product extends Document {

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Store'
    })
    store: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    title: string;
    
    @Prop({
        type: String
    })
    description: string;
    
    @Prop({
        type: Number,
        required: true
    })
    price: number;

    @Prop({
        type: Number
    })
    comparativePrice: number;

    @Prop({
        type: String,
        required: true
    })
    image: string;

    @Prop({
        type: String,
        required: true,
        enum: {
            values: ValidGenders,
            message: 'Gender is not valid'
        }
    })
    gender: string;

    @Prop({
        type: String,
        required: true,
        enum: {
            values: ValidCategories,
            message: 'Category is not valid'
        }
    })
    category: string;

    @Prop([
        raw({
            size: {
                type: String,
                required: true,
                enum: {
                    values: ValidSizes,
                    message: 'Size is not valid'
                }
            },
            stock: {
                type: Number,
                default: 0
            }
        }
    )])
    sizes: {size: Size, stock: number}[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);