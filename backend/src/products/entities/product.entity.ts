import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category, ValidCategories } from '../types/category';
import { Gender, ValidGenders } from '../types/gender';
import { Size, ValidSizes } from '../types/size';

@Schema()
export class Product extends Document {

   @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Store'
    })
    store: Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    title: string;
    
    @Prop({
        type: String
    })
    description?: string;
    
    @Prop({
        type: Number,
        required: true
    })
    price: number;

    @Prop({
        type: Number
    })
    comparativePrice?: number;

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
    gender: Gender;

    @Prop({
        type: String,
        required: true,
        enum: {
            values: ValidCategories,
            message: 'Category is not valid'
        }
    })
    category: Category;

    @Prop({
        type: [
            {
                type: String,
                enum: {
                    values: ValidSizes,
                    message: 'Size is not valid'
                }
            }
        ],
        default: []
    })
    sizes?: Size[];

    @Prop({
        type: [
            {
                type: String,
                enum: {
                    values: ValidSizes,
                    message: 'Size is not valid'
                }
            }
        ],
        default: []
    })
    shoeSizes?: number[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);