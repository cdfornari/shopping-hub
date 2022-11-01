import { CartProduct, ShoppingCart } from '../../models';

type cartAction =
|{ type: 'SET_CART', payload: CartProduct[] }
|{ type: 'DELETE_CART'}
|{ type: 'UPDATE_PRODUCT_QUANTITY', payload: CartProduct }
|{ type: 'REMOVE_PRODUCT', payload: CartProduct }

export const shoppingCartReducer = (state: ShoppingCart, action: cartAction) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                products: action.payload
            };
        case `UPDATE_PRODUCT_QUANTITY`:
            return {
                ...state,
                products: state.products.map(product => 
                    product._id === action.payload._id && product.size === action.payload.size
                    ? action.payload : product)
            };
        case `REMOVE_PRODUCT`:
            return {
                ...state,
                products: state.products.filter(product =>
                    product._id !== action.payload._id || product.size !== action.payload.size
                )
            };
        case 'DELETE_CART':
            return {
                ...state,
                products: []
            };
        default:
            return state;
    }
};