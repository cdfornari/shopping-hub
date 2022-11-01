import Cookies from 'js-cookie';
import { FC, useEffect, useReducer } from 'react';
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

    useEffect(() => {
        const cookiesCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
        dispatch({type: 'SET_CART', payload: cookiesCart});
    },[])

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
        Cookies.set('cart', JSON.stringify(newCart), {expires: 31});
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
        Cookies.set('cart', JSON.stringify(state.products), {expires: 31});
    }
    const removeProduct = (product: CartProduct) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: product
        })
        Cookies.set('cart', JSON.stringify(state.products), {expires: 31});
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