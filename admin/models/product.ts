import { Store } from './Store';

export interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    comparativePrice: number;
    store: Store;
    sizes?: Size[];
    shoeSizes?: number[];
    category: Category;
    gender: Gender;
    isActive: boolean;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'UNI';
export type Category = 'tops'|'bottoms'|'shoes'|'accessories'|'underwear'|'pijamas';
export type Gender = 'men'|'women'|'kids'|'unisex';
export const ValidSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'UNI'];
export const shoeSizes = [6,7,8,9,10,11,12,13];
export const ValidCategories: Category[] = ['tops', 'bottoms', 'shoes', 'accessories', 'underwear', 'pijamas'];
export const ValidGenders: Gender[] = ['men','kids','women','unisex'];