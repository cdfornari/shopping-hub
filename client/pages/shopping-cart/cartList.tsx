import { Grid, Text, Card, Button, Row, Link } from '@nextui-org/react';
import { ShopLayout } from '../../layouts';
import NextLink from 'next/link';
import { CartList, OrderSummary } from '../../components/cart';
import { FC } from 'react';
import { CartProduct } from '../../models';

interface Props{
  products: CartProduct[],
}

const CartListPage: FC<Props> = ( {products} ) => {
    return (
        <ShopLayout title='Carrito - 3' description={'Carrito de compras de la tienda'}>
            <Text h1>Carrito de Compra</Text>
            <Grid.Container gap={2} justify="center">
                <Grid xs={ 12 } sm={ 7 } alignContent='center' direction='column'>
                    <CartList editable products={ products } />
                </Grid>
                <Grid xs={ 12 } sm={ 5 }  css={{height: "50%"}}>
                    <Card>
                        <Card.Header css={{ py: "$0" }}>
                          <Text h2>Orden</Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ py: "$5" }} >
                            <OrderSummary />
                            <Card.Divider />
                            <Card.Footer >
                              <Row justify="center">
                                <NextLink href={"/checkout"} passHref >
                                  <Link>
                                    <Button color="secondary" >
                                          Checkout
                                    </Button>
                                  </Link>
                                </NextLink>
                              </Row>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </ShopLayout>
    )
}

export default CartListPage;