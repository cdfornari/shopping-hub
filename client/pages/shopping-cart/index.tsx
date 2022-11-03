import { useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '@nextui-org/react';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { ShopLayout } from '../../layouts';
import EmptyPage from '../../components/cart/EmptyCart';
import CartListPage from '../../components/cart/CartPage';

const CartPage = () => {
    const { products } = useContext( ShoppingCartContext );
    const [firstRender,setFirstRender] = useState(true)
    useEffect(() => {
      setFirstRender(false)
    }, [])
    return(
        <ShopLayout title='Carrito' description={'Carrito de compras de la tienda'}>
            {
                firstRender ? <Loading/> : (
                    products.length === 0 ? <EmptyPage /> : <CartListPage products={ products }/>
                )
            }
        </ShopLayout> 
    )
}

export default CartPage;