import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { Grid, Input, Spacer, Text, Link, Card, User, Divider } from '@nextui-org/react';
import axios from 'axios';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Order } from '../../../models/Order';
import { OrderStatusReducer } from '../../../components/table/cell-reducers/OrderStatusReducer';

interface Props{
  order: Order;
}

const DetailsBrandsPage: FC<Props> = ( {order} ) => {
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
                    label='Cliente'
                    value={ order.client.fullName }
                    fullWidth
                    bordered
                    readOnly
                    size="lg"
                    type={"text"}
                  />
                </Link>
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
            <Grid xs={12}>
                <Input
                  label='Total de la orden'
                  value={`${ order.paymentMethod === 'zelle' ? "$": "bs"}${order.total}` }
                  fullWidth
                  bordered
                  readOnly
                  size="lg"
                  type={"text"}
                />
            </Grid>
            <Grid xs={12} css={{height: 'max-content', width: 'max-content'}}>
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
                        key={prod._id}
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