import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Text, Card, Button, Row, useTheme } from '@nextui-org/react';
import { CartList, OrderSummary } from '.';
import { CartProduct } from '../../models';
import { AuthContext } from '../../context/auth';
import { Notification } from '../../notification';

interface Props{
  products: CartProduct[],
}

const CartListPage: FC<Props> = ( {products} ) => {
  const {isDark} = useTheme()
  const {user} = useContext(AuthContext);
  const {push} = useRouter()
  const [total,setTotal] = useState<number>()
  useEffect(() => {
      setTotal(products.reduce((acc,product) => acc + (product.price * product.quantity),0))
  },[products])
  const onCheckout = () => {
    if(user){
      push('/checkout')
    }else{
      Notification(isDark).fire({
        icon: 'error',
        title: 'Debes iniciar sesión para continuar'
      })
      push('/auth/login')
    }
  }
  return (
    <>
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
                      <OrderSummary
                        total={total}
                        numberOfItems={products.reduce((acc,product) => acc + product.quantity,0)}
                      />
                      <Card.Divider />
                      <Card.Footer >
                        <Row justify="center">
                          <Button
                            light
                            auto
                            onPress={onCheckout}
                            css={{ color: "$primary" }}
                          >
                            Confirmar Orden
                          </Button>
                        </Row>
                      </Card.Footer>
                  </Card.Body>
              </Card>
          </Grid>
      </Grid.Container>
    </>
  )
}

export default CartListPage;