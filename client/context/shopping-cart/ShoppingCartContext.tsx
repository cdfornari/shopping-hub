import { createContext } from 'react';
import { CartProduct, ShoppingCart } from '../../models';

interface ContextProps extends ShoppingCart{
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct) => void;
    removeProduct: (product: CartProduct) => void;
}

export const ShoppingCartContext = createContext({} as ContextProps);