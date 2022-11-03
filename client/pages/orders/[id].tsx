import { FC } from 'react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { Grid, Input, Spacer, Text, Link, Card, Divider, User } from '@nextui-org/react';
import axios from 'axios';
import { ShopLayout } from '../../layouts';
import { Order } from '../../models/OrderSummary';
import { OrderStatusReducer } from '../../components/table/cell-reducers/OrderStatusReducer';

interface Props{
  order: Order;
}

const DetailsBrandsPage: FC<Props> = ( {order} ) => {
  return (
    <ShopLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <Text h1 css={{ml: '$14'}}>Detalles de la orden</Text>
        <Spacer y={2} />

        <Grid.Container gap={2} >
            <Grid direction='column' xs={12} sm={6} >
              <Grid xs={12}>
                <NextLink href='/profile'>
                  <Link>
                    {order.client.fullName}
                  </Link>
                </NextLink>
              </Grid>
              <Grid xs={12} >
                  <Input
                    label='Dirección'
                    value={ order.address }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
              </Grid>
              <Grid xs={12}>
                  <Input 
                    label='Estado'
                    value={ order.state }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
              </Grid>
              <Grid xs={12}>
                  <Input 
                    label='Ciudad'
                    value={ order.city }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
              </Grid>
            </Grid>

            <Grid direction='column' xs={12} sm={6}>              
              <Grid xs={12} >
                  <Input                        
                    label='Metodo de pago'
                    value={ order.paymentMethod }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />

              </Grid>
              <Spacer y={1} />
              <Grid xs={12} >
                  <Input
                    label='Código de referencia'
                    value={ order.refCode }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
              </Grid>
              <Spacer y={1} />

              <Grid xs={12}>
                  <Input
                    label='Total de la orden'
                    value={`${ order.paymentMethod === 'zelle' ? "$": "Bs."}${order.total.toFixed(2)}` }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
              </Grid>
              <Spacer y={1} />

              <Grid xs={12} css={{width: "100%"}} >
                <OrderStatusReducer statusKey = {order.status} />
              </Grid>
            </Grid>

            <Grid.Container 
              alignContent='center' 
              alignItems='center' 
              direction='column' 
              gap={4} 
              css={ { py: '$8'}}
            >
              <Grid xs= {12}  direction= 'column' css={{width: '100%'}}>
                <Card >
                  <Card.Header css={{}} >
                    Productos:
                  </Card.Header>
                  <Divider />
                  <Card.Body >
                    {
                      order.products.map( (prod) => (
                        <User
                          size="xl"
                          src={ prod.product.image}
                          name={prod.product.title }
                          description= {`Cantidad: ${prod.quantity}, Talla: ${prod.size}`}
                          css={{py: '$4'}}
                        />
                      ))
                    }
                  </Card.Body>
                </Card>
              </Grid>
            </Grid.Container>


        </Grid.Container>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as {id: string};
  const { token } = ctx.req.cookies;
  const {data: order} = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
    {
      headers: { 
        Cookie: `token=${token};`, 
        Authorization: `Bearer ${token}`
      },
    }
  );
  
  if (!order) {
    return{
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {
      order,
    }
  }
}

export default DetailsBrandsPage