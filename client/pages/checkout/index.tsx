import { GetServerSideProps, NextPage } from 'next';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Text, Card, Spacer, Button, Input, Container, Radio, Loading, useTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { Box } from '../../components/containers';
import { useForm } from '../../hooks/useForm';
import { ShopLayout } from '../../layouts';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { Notification } from '../../notification';
import { api } from '../../api/api';
import axios from 'axios';

interface Props {
    exchange: number;
}

const CheckoutPage: NextPage<Props> = ({exchange}) => {
    const {isDark} = useTheme()
    const {push} = useRouter()
    const {products,clearCart} = useContext(ShoppingCartContext);
    const [isLoading,setIsLoading] = useState(false)
    const [paymentMethod,setPaymentMethod] = useState('');
    const [total,setTotal] = useState<number>()
    useEffect(() => {
        setTotal(products.reduce((acc,product) => acc + (product.price * product.quantity),0))
    },[products])
    const {allowSubmit,parsedFields} = useForm([
        {
          name: 'address',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Dirección válida',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
        },
        {
          name: 'state',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Estado válido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
        },
        {
          name: 'city',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Ciudad válida',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
        },
        {
          name: 'code',
          validate: (value: string) => value.length >= 9,
          validMessage: 'Codigo de confirmación válido',
          errorMessage: 'Codigo de confirmación inválido',
          initialValue: '',
        },
      ])
    const [address, state, city, code] = parsedFields;
    const handleSubmit = async () => {
        if(products.length === 0) {
            return Notification(isDark).fire({
                icon: 'error',
                title: 'No hay productos en el carrito'
            })
        }
        setIsLoading(true)
        try {
            await api.post('/orders/create', 
                {
                    address: address.value,
                    state: state.value,
                    city: city.value,
                    refCode: code.value,
                    paymentMethod,
                    products: products.map(product => ({
                        product: product._id,
                        quantity: product.quantity,
                        size: product.size,
                        shoeSize: product.shoeSize
                    }))
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }
            )
            setIsLoading(false)
            Notification(isDark).fire({
                icon: 'success',
                title: 'Orden creada con éxito'
            })
            clearCart();
            push('/orders')
        } catch (error: any) {
            setIsLoading(false)
            Notification(isDark).fire({
                icon: 'error',
                title: error.response.data.message
            })
        }
    }
    return (
        <ShopLayout title='Checkout - Order' description='Finalizar Orden'>
            <Container
                fluid
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Text h1>Crear Orden</Text>
            </Container>
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={ 7 } direction="column">
                    <Spacer y={1} />
                    <Box
                        css={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Input
                            labelPlaceholder='Dirección'
                            value={address.value}
                            onChange={(e) => address.setValue(e.target.value)}
                            helperColor={address.color}
                            status={address.color}
                            helperText={address.message}
                            color={address.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2.5} />
                        <Input
                            labelPlaceholder='Estado'
                            value={state.value}
                            onChange={(e) => state.setValue(e.target.value)}
                            helperText={state.message}
                            helperColor={state.color}
                            status={state.color}
                            color={state.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2.5} />
                        <Input
                            labelPlaceholder='Ciudad'
                            value={city.value}
                            onChange={(e) => city.setValue(e.target.value)}
                            helperColor={city.color}
                            helperText={city.message}
                            status={city.color}
                            color={city.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2.5} />
                        <Input
                            labelPlaceholder='Codigo Confirmación'
                            value={code.value}
                            onChange={(e) => code.setValue(e.target.value)}
                            helperColor={code.color}
                            helperText={code.message}
                            status={code.color}
                            color={code.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={1} />
                        <Radio.Group
                            label= "Metodo de Pago"
                            value = {paymentMethod}
                            onChange= {setPaymentMethod}
                        >
                            <Radio value ="pago-movil">
                                Pago Movil
                            </Radio>
                            <Radio value = "zelle">
                                Zelle
                            </Radio>
                        </Radio.Group>
                        <Spacer y={1} />
                        <Button
                            size='lg'
                            disabled={!allowSubmit || isLoading}
                            onPress={handleSubmit}
                        >
                            {isLoading ? <Loading/> : 'Crear Orden'}   
                        </Button>
                    </Box>
                </Grid>
                <Grid xs={ 12 } sm={ 5 }>
                    <Card
                        variant='bordered'
                        css={{
                            py: '$10',
                            px: '$18',
                            width: 'fit-content',
                            d: 'flex',
                            dflex: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card.Header css={{ py: "$0",d: 'flex',jc: 'center' }}>
                          <Text h2>Pago Móvil</Text>
                        </Card.Header>
                        <Card.Body css={{ py: "$5" }} >
                            <Text>V28155389</Text>
                            <Text>04141115826</Text>
                            <Text>Banco Mercantil (0102)</Text>
                            {
                                !total ? <Loading/> : <Text>Bs.{(total*exchange).toFixed(2)}</Text>
                            }
                        </Card.Body>
                        <Card.Divider css={{my: '$10'}} />
                        <Card.Header css={{ py: "$0",d: 'flex',jc: 'center' }}>
                            <Text h2>Zelle</Text>
                        </Card.Header>
                        <Card.Body css={{ py: "$5" }} >
                            <Text>zelle@shoppinghub.com</Text>
                            <Text>Shopping Hub</Text>
                            {
                                !total ? <Loading/> : <Text>${total.toFixed(2)}</Text>
                            }
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>  
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {data: exchange} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/exchanges/bolivar`,
    );
    return {
      props: {
        exchange,
      }
    }
}

export default CheckoutPage;
