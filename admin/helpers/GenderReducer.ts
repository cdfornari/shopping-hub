import { Gender } from '../models/product';

const translateGender = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kids': 'Niños',
    'unisex': 'Unisex'
}

export const genderReducer = (gender:Gender) => {return translateGender[gender]};