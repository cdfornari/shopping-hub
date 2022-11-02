import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Dropdown, Grid, Input, Spacer, Text, Link, Container, Card } from '@nextui-org/react';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Order } from '../../../models/Order';
import { FC } from 'react';
import { OrderStatusReducer } from '../../../components/table/cell-reducers/OrderStatusReducer';
import { useState } from 'react';
import { DropDownProducts } from '../../../components/DropDownProducts';

interface Props{
  order: Order;
}

const DetailsBrandsPage: FC<Props> = ( {order} ) => {
  const [selectedProduct, setSelectedProduct] = useState(1);
  console.log(order)
  console.log(order.products)
  return (
    <DashboardLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <Text h1>Detalles de la orden</Text>
        <Spacer y={2} />
        
        <Grid.Container gap={2} >
            <Grid direction='column' xs={12} sm={6} >
              <Grid xs={12}>
                  <Link href={`/dashboard/clients/${order.client._id}`}>
                      <Input 
                        labelPlaceholder='Cliente'
                        value={ order.client.fullName }
                        fullWidth
                        bordered
                        readOnly
                        size="lg"
                        type={"text"}
                      />
                  </Link>
              </Grid>
              <Spacer y={1} />
              <Grid xs={12} >
                  <Input
                      labelPlaceholder='Dirección'
                      value={ order.address }
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
                    labelPlaceholder='Estado'
                    value={ order.state }
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
                    labelPlaceholder='Ciudad'
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
                    labelPlaceholder='Metodo de pago'
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
                    labelPlaceholder='Código de referencia'
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
                    labelPlaceholder='Total de la orden'
                    value={`${ order.paymentMethod === 'zelle' ? "$": "bs"}${order.total}` }
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

            <Container alignContent='center' alignItems='center' direction='column'>
              <Grid xs= {12} sm={7} direction= 'column'>
                <Card>
                  <Text h1>PEPE</Text>
                  <Card.Image 
                    src={ order.products[0].product.image }
                  />
                </Card>
              </Grid>

              <Grid xs= {12} sm={5} direction= 'column'>
                <DropDownProducts products={ order.products }/>
              </Grid>

            </Container>


        </Grid.Container>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { token } = ctx.req.cookies;
  const { id = '' } = ctx.params as {id: string}; 
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