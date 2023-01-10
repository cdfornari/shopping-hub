import { Category } from '../models';

const translateCategory = {
    'tops': 'Prendas superiores',
    'bottoms': 'Prendas inferiores',
    'shoes': 'Zapatos',
    'accessories': 'Accesorios',
    'underwear': 'Ropa interior',
    'pijamas': 'Pijamas'
}

export const categoryReducer = (cat:Category) => {return translateCategory[cat]};