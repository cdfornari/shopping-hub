import { Grid, Text, Card, Spacer, Button } from '@nextui-org/react';
import { ShopLayout } from '../../layouts';

import { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { useRouter } from 'next/router';

const CartPage = () => {

    const { isLoaded, cart } = useContext( CartContext );
    const router = useRouter();

    useEffect(() => {
      if ( isLoaded && cart.length === 0 ){
        router.replace('/cart/empty');
      }
    }, [ isLoaded, cart, router ])
    
    if ( !isLoaded || cart.length === 0 ) {
        return (<></>);
    }

    return (
        <ShopLayout title='Carrito - 3' description={'Carrito de compras de la tienda'}>
            <Text h1>Carrito</Text>

            <Grid.Container>
                <Grid xs={ 12 } sm={ 7 }>
                    <CartList editable />
                </Grid>
                <Grid xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <Card.Body>
                            <Text h2>Orden</Text>
                            <Spacer css={{my: 1}} />

                            <OrderSummary />

                            <Grid>
                                <Button 
                                    color="secondary"
                                    className='circular-btn' 
                                    href='/checkout/address'
                                >
                                    Checkout
                                </Button>
                            </Grid>

                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>


        </ShopLayout>
    )
}

export default CartPage;