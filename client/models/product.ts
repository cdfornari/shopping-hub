export interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    comparativePrice?: number;
    sizes?: {
        size: Size;
        stock: number;
    }[];
    shoeSizes?: {
        size: number;
        stock: number;
    }[];
    category: Category;
    gender: Gender;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'UNI';
export type Category = 'tops'|'bottoms'|'shoes'|'accessories'|'underwear'|'pijamas';
export type Gender = 'men'|'women'|'kids'|'unisex';