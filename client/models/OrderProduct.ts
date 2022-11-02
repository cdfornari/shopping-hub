import { Product, Size } from "./product";

export interface OrderProduct{
    _id: string;
    quantity: number;
    size: Size;
    products: Product;
}