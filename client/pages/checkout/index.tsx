import { Grid, Text, Card, Spacer, Button, Input, Container } from '@nextui-org/react';
import { Box } from '../../components/containers';
import { ShopLayout } from '../../layouts';

const CheckoutPage = () => {

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
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Estado'
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Ciudad'
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={2} />
                        <Input
                            labelPlaceholder='Codigo Confirmación'
                            clearable
                            bordered
                            width='50%'
                            size='lg'
                            type='text'
                        />
                        <Spacer y={3} />
                        <Button
                            size='xl'
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