import { Product,Size } from './';

export interface CartProduct extends Product{
    size: Size;
    quantity: number;
}