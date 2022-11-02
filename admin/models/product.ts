import { Store } from "./Store";
import { Size } from "../types/size";
import { Category } from "../types/category";
import { Gender } from "../types/gender";

export interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    store: Store;
    comparativePrice?: number;
    sizes?: Size[];
    shoeSizes?: number[];
    category: Category;
    gender: Gender;
}
