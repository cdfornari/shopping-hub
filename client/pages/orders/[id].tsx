import { FC, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Grid, Input, Spacer, Text, Link, Card, Divider, User, Button, useTheme } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ShopLayout } from '../../layouts';
import { Order } from '../../models/OrderSummary';
import { OrderStatusReducer } from '../../components/table/cell-reducers/OrderStatusReducer';
import { ReviewModal } from '../../components/reviews/ReviewModal';
import { OrderProduct } from '../../models/OrderProduct';
import { Notification } from '../../notification';
import { api } from '../../api/api';

interface Props{
  order: Order;
}

const OrderDetailsPage: FC<Props> = ( {order} ) => {
  const {isDark} = useTheme()
  const router = useRouter()
  const [productToReview, setProductToReview] = useState<OrderProduct | undefined>()
  const onSubmit = async(rating: number, comment: string) => {
    setProductToReview(undefined)
    Notification(isDark).fire({
      icon: 'info',
      title: 'Cargando',
    })
    try {
      await api.post('/reviews',{
        rating,
        comment,
        productId: productToReview?.product._id,
        orderId: order._id
      },{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      Notification(isDark).fire({
        icon: 'success',
        title: 'Reseña enviada',
      })
      router.replace(router.asPath)
    } catch (error: any) {
      Notification(isDark).fire({
        icon: 'error',
        title: error.response.data.message,
      }) 
    }
  }
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
          <Grid xs= {12} direction='column' css={{width: '100%'}}>
            <Card >
              <Card.Header css={{}} >
                Productos:
              </Card.Header>
              <Divider />
              <Card.Body >
                {
                  order.products.map((prod) => (
                    <div 
                      key={prod._id}
                      style={{display: 'flex', alignItems: 'center'}}
                    >
                      <User
                        size="xl"
                        src={ prod.product.image}
                        name={prod.product.title }
                        description= {`Cantidad: ${prod.quantity}, Talla: ${prod.size}`}
                        css={{py: '$4'}}
                      />
                      {
                        order.status === 'delivered' ? (
                          prod.isReviewed ? (
                            <Text>
                              Ya has escrito una reseña
                            </Text>
                          ) : (
                            <Button
                              flat
                              size='sm'
                              onPress={() => setProductToReview(prod)}
                            >
                              Escribir una reseña
                            </Button>
                          )
                        ) : (
                          <Text>
                            Cuando la orden sea entregada podrás escribir una reseña
                          </Text>
                        )
                      }
                    </div>
                  ))
                }
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Grid.Container>
      <ReviewModal
        orderProduct={productToReview}
        isVisible={!!productToReview}
        onClose={() => setProductToReview(undefined)}
        onSubmit={onSubmit}
      />
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

export default OrderDetailsPage