import { Product,Size } from './';

export interface CartProduct extends Product{
    size?: Size;
    shoeSize?: number;
    quantity: number;
}