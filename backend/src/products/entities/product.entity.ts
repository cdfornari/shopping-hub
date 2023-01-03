import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Store } from 'src/stores/entities/store.entity';
import { Category, ValidCategories } from '../types/category';
import { Gender, ValidGenders } from '../types/gender';
import { Size, ValidSizes } from '../types/size';
import { Review } from '../../reviews/entities/review.entity';

@Schema({
    versionKey: false,
})
export class Product extends Document {

   @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Store',
    })
    store: Store;

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
        type: Boolean,
        default: true
    })
    isActive: boolean;

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
    sizes: Size[];

    @Prop({
        type: [Number],
        default: []
    })
    shoeSizes: number[];

    @Prop({
        type: [Types.ObjectId],
        ref: 'Review',
        default: []
    })
    reviews: Review[] | Types.ObjectId[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);