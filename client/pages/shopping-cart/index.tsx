import { useContext } from 'react';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { ShopLayout } from '../../layouts';
import EmptyPage from '../../components/cart/EmptyCart';
import CartListPage from '../../components/cart/PageCart';


const CartPage = () => {
    const { products } = useContext( ShoppingCartContext );
    return(
        <ShopLayout title='Carrito' description={'Carrito de compras de la tienda'}>
            {
                products.length === 0 ? <EmptyPage /> : <CartListPage products={ products }/>
            }
        </ShopLayout>
            
    )
}

export default CartPage;