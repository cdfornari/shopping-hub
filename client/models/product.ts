export interface Product {
    _id: string;
    description: string;
    image: string;
    stock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: Type;
    gender: Gender;
    createdAt?: string;
    updatedAt?: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'UNI';
export type Type = 'tops'|'bottoms'|'shoes'|'accessories';
export type Gender = 'men'|'women'|'kid'|'unisex';