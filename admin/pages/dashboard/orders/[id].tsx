import { FC,useState } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Grid, Input, Spacer, Text, Link, Card, User, Divider, Container, Button, Row, Modal, useModal, useTheme, Loading } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Order } from '../../../models/Order';
import { OrderStatusReducer } from '../../../components/table/cell-reducers/OrderStatusReducer';
import { Flex } from '../../../components/containers';
import { Notification } from '../../../notification';
import { api } from '../../../api/api';

interface Props{
  order: Order;
}

const OrderDetailsPage: FC<Props> = ({order}) => {
  const {isDark} = useTheme();
  const router = useRouter()
  const { setVisible, bindings } = useModal();
  const [action, setAction] = useState<'cancel'|'next-step'>()
  const [isLoading,setIsLoading] = useState(false)
  const onStatusChange = async () => {
    setVisible(false)
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })      
    try {
      await api.patch(
        action === 'cancel' ? `/orders/cancel/${order._id}` : 
        `/orders/${order._id}`, {}, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      )
      Notification(isDark).fire({
        title: 'Orden actualizada',
        icon: 'success',
      })
      setIsLoading(false)
      router.replace(router.asPath)
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
        timer: 3000
      })
      setIsLoading(false)
    }
  }
  return (
    <DashboardLayout 
      title='Detalles de la orden'
      description='Pagina administrativa'
    >
      <Modal {...bindings}>
        <Modal.Header>
          {
            action === 'cancel' ? (
              <Text id='modal-title'>
                ¿Estas seguro de querer cancelar la orden?
              </Text>
            ) : (
              <Text id='modal-title'>
                {
                  order.status === 'pending' ? '¿Estas seguro de querer aprobar la orden?' :
                  order.status === 'approved' ? '¿Estas seguro de querer marcar la orden como enviada?' :
                  '¿Estas seguro de querer marcar la orden como entregada?'
                }
              </Text>
            )
          }
        </Modal.Header>
        <Modal.Footer>
          <Button
            flat
            color={action === 'cancel' ? 'success' : 'error'}
            size='sm'
            onClick={() => setVisible(false)}
          >
            Salir
          </Button>
          <Button
            flat
            color={action === 'cancel' ? 'error' : 'success'}
            size='sm'
            onClick={onStatusChange}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Flex
        css={{
          'mt': '$5',
          'px': '$6',
          '@sm': {
            mt: '$10',
            px: '$16',
          },
        }}
        justify='between'
        align='center'
      >
        <Text h1>
          Detalles de la Orden
        </Text>
        <NextLink href='/dashboard/orders'>
          <Link>
            Volver
          </Link>
        </NextLink>
      </Flex>

      <Spacer y={2} />
      <Container fluid>
        <Link href={`/dashboard/clients/${order.client._id}`}>
          <Input 
            label='Cliente'
            value={order.client.fullName}
            fullWidth
            bordered
            readOnly
            size="lg"
            type="text"
          />
        </Link>
      </Container>
      <Grid.Container gap={2} >
          <Grid direction='column' xs={12} sm={6} >
            <Grid xs={12} >
                <Input
                  label='Dirección'
                  value={ order.address }
                  fullWidth
                  bordered
                  readOnly
                  size="lg"
                  type="text"
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
                type="text"
              />
            </Grid>
            <Grid xs={12}>
              <Input 
                label='Ciudad'
                value={order.city}
                fullWidth
                bordered
                readOnly
                size="lg"
                type="text"
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
                type="text"
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
                type="text"
              />
            </Grid>
            <Grid xs={12}>
              <Input
                label='Total de la orden'
                value={`${ order.paymentMethod === 'zelle' ? "$" : "Bs. "}${order.total}` }
                fullWidth
                bordered
                readOnly
                size="lg"
                type="text"
              />
            </Grid>
          </Grid>
          <Row 
            css={{
              px: '$10',
              w: '100%',
              gap: '$8',
            }}
          >
            <OrderStatusReducer statusKey={order.status}/>
            {
              ['pending','approved','shipped'].includes(order.status) && (
                <Button
                  flat
                  disabled={isLoading}
                  color='success'
                  size='sm'
                  onClick={() => {
                    setAction('next-step')
                    setVisible(true)
                  }}
                >
                  {
                    isLoading ? <Loading type="spinner" color="currentColor" size="sm" /> :
                    order.status === 'pending' ? 'Aprobar orden' : 
                    order.status === 'approved' ? 'Marcar como enviado' : 
                    'Marcar como entregado'
                  }
                </Button>
              )
            }
            {
              order.status === 'pending' && (
                <Button
                  flat
                  disabled={isLoading}
                  color='error'
                  size='sm'
                  onClick={() => {
                    setAction('cancel')
                    setVisible(true)
                  }}
                >
                  {
                    isLoading ? <Loading type="spinner" color="currentColor" size="sm" /> :
                    'Cancelar orden'
                  }
                </Button>
              )
            }
          </Row>
          <Grid.Container 
            alignContent='center' 
            alignItems='center' 
            direction='column' 
            gap={4} 
            css={ { py: '$8'}}
          >
            <Grid xs= {12}  direction= 'column' css={{w: '100%'}}>
              <Card>
                <Card.Header>
                  Productos:
                </Card.Header>
                <Divider/>
                <Card.Body>
                  {
                    order.products.map((prod) => (
                      <User
                        key={prod._id}
                        size="xl"
                        src={prod.product.image}
                        name={prod.product.title}
                        description={`Cantidad: ${prod.quantity}, Talla: ${prod.size}`}
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

export default OrderDetailsPage