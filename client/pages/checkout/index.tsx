import { Grid, Text, Card, Spacer, Button, Input, Container, Radio } from '@nextui-org/react';
import { Box } from '../../components/containers';
import { useForm } from '../../hooks/useForm';
import { ShopLayout } from '../../layouts';
import { useState } from 'react';

const CheckoutPage = () => {
    const {allowSubmit,parsedFields} = useForm([
        {
          name: 'address',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Dirección válida',
          errorMessage: 'Dirección inválida',
          initialValue: '',
        },
        {
          name: 'state',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Estado válido',
          errorMessage: 'Estado inválido',
          initialValue: '',
        },
        {
          name: 'city',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Ciudad válida',
          errorMessage: 'Ciudad inválida',
          initialValue: '',
        },
        {
          name: 'code',
          validate: (value: string) => value.length >= 3,
          validMessage: 'Codigo de confirmación válido',
          errorMessage: 'Codigo de confirmación inválido',
          initialValue: '',
        },
      ])
    const [address, state, city, code] = parsedFields;
    const [ paymentMethod, setPaymentMethod] = useState("");
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
                            color={address.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Estado'
                            value={state.value}
                            onChange={(e) => state.setValue(e.target.value)}
                            helperColor={state.color}
                            status={state.color}
                            color={state.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Ciudad'
                            value={city.value}
                            onChange={(e) => city.setValue(e.target.value)}
                            helperColor={city.color}
                            status={city.color}
                            color={city.color}
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Codigo Confirmación'
                            value={code.value}
                            onChange={(e) => code.setValue(e.target.value)}
                            helperColor={code.color}
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
                        >
                            Confirmar Compra    
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
                          <Text h2>Pago Movil</Text>
                        </Card.Header>
                        <Card.Body css={{ py: "$5" }} >
                            <Text>V28155389</Text>
                            <Text>04141115826</Text>
                            <Text>Banco Mercantil (0102)</Text>
                            <Text>570bs</Text>
                        </Card.Body>
                        <Card.Divider css={{my: '$10'}} />
                        <Card.Header css={{ py: "$0",d: 'flex',jc: 'center' }}>
                            <Text h2>Zelle</Text>
                        </Card.Header>
                        <Card.Body css={{ py: "$5" }} >
                            <Text>alejoguevarafm@gmail.com</Text>
                            <Text>Alejandro Molina</Text>
                            <Text>62,28$ </Text>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
            
        </ShopLayout>
    )
}

export default CheckoutPage;