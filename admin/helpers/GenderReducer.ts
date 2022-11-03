import { Gender } from "../types/gender";

const translateGender = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Unisex'
}

export const genderReducer = (gender:Gender) => {return translateGender[gender]};