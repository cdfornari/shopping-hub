import { Gender } from "../types/gender";

const translateGender = {
    'men': 'Hombre',
    'women': 'Mujer',
    'kid': 'Niños',
    'unisex':  'Unisex'
}

export const genderReducer = (gender:Gender) => {return translateGender[gender]};

