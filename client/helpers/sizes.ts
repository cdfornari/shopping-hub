import { Size,ValidSizes } from '../models/product';

export const sortSizes = (sizes: Size[]) => 
    sizes.sort((a, b) => ValidSizes.indexOf(a) - ValidSizes.indexOf(b));