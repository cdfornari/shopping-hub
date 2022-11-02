import { Product,Size } from './product';

export interface CartProduct extends Product{
    size?: Size;
    shoeSize?: number;
    quantity: number;
}