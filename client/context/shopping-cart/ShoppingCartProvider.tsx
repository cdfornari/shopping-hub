import { FC, useReducer } from 'react';
import { CartProduct, ShoppingCart } from '../../models';
import { shoppingCartReducer,ShoppingCartContext } from './';

const initialState: ShoppingCart = {
    products: []
}

interface Props {
    children: React.ReactNode;
}

export const ShoppingCartProvider: FC<Props> = ({children}) => {
    const [state,dispatch] = useReducer(shoppingCartReducer, initialState);

    const addProductToCart = (product: CartProduct) => {
        let foundProduct = false;
        const newCart = state.products.map(productInCart => {
            if (
                productInCart._id !== product._id
                || productInCart.size !== product.size
            ) return productInCart;
            foundProduct = true;
            productInCart.quantity += product.quantity;
            return productInCart;
        })
        if(!foundProduct) newCart.unshift(product)
        dispatch({
            type: 'SET_CART',
            payload: newCart
        })
    }
    const updateProductQuantity = (product: CartProduct) => {
        dispatch({
            type: 'UPDATE_PRODUCT_QUANTITY',
            payload: product
        })
    }
    const removeProduct = (product: CartProduct) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: product
        })
    }
    
    return (
        <ShoppingCartContext.Provider  
            value={{
                ...state,
                addProductToCart,
                updateProductQuantity,
                removeProduct
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
};