import { useContext, useEffect, useState } from 'react';
import { Loading, useTheme } from '@nextui-org/react';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { ShopLayout } from '../../layouts';
import { api } from '../../api/api';
import { Notification } from '../../notification';
import EmptyPage from '../../components/cart/EmptyCart';
import CartListPage from '../../components/cart/CartPage';

const CartPage = () => {
    const {isDark} = useTheme();
    const { products,removeProduct } = useContext( ShoppingCartContext );
    const [firstRender,setFirstRender] = useState(true)
    useEffect(() => {
      if(products.length > 0)
        api.post('/products/validate-cart', {
            products: products.map(({_id}) => _id)
        }).then(({data}: {data: string[]}) => {
            if(data.length > 0){
                data.forEach(id => removeProduct(products.find(({_id}) => _id === id)!))
                Notification(isDark).fire({
                    icon: 'error',
                    title: 'Algunos productos de tu carrito no están disponibles',
                    timer: 5000,
                })
            }
        })
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