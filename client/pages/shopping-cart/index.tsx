import { useContext } from 'react';
import { ShoppingCartContext } from '../../context/shopping-cart';
import CartListPage from './cartList';
import EmptyPage from './empty';

const CartPage = () => {
    const { products } = useContext( ShoppingCartContext );
    
    return(
            products.length === 0 ? <EmptyPage /> : <CartListPage products={ products }/>
    )
}

export default CartPage;