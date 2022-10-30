import { Grid, Text, Card, Spacer, Button, Row, Input } from '@nextui-org/react';
import { ShopLayout } from '../../layouts';

const CheckoutPage = () => {

    return (
        <ShopLayout title='CheckOut - Order' description={'Finalizar Orden'}>
            <Text h2>CheckOut</Text>
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={ 7 } direction="column">
                    <Input
                        label='Dirección'
                        fullWidth
                    />

                    <Input
                        label='Estado'
                        fullWidth
                    />

                    <Input
                        label='Ciudad'
                        fullWidth
                    />

                    <Input
                        label='Codigo Confirmación'
                        fullWidth
                    />

                    <Spacer y={5} />
                    <Button>
                        Confirmar Compra    
                    </Button>
                </Grid>
                <Grid xs={ 12 } sm={ 5 }>
                    <Card>
                        <Card.Header css={{ py: "$0" }}>
                          <Text h3>Pago Movil</Text>
                        </Card.Header>
                        <Card.Divider  />
                        <Card.Body css={{ py: "$5" }} >
                            <Text h4>C.I.: V-28.155.389</Text>

                            <Text h4>Tlf: 0414-1115826</Text>

                            <Text h4>Banco: Mercantil (0102)</Text>

                            <Text h4>Monto: 570bs</Text>
                        </Card.Body>
                        <Card.Divider />
                        <Card.Header css={{ py: "$0" }}>
                            <Text h3>Zell</Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ py: "$5" }} >
                            <Text h4>Correo: alejoguevarafm@gmail.com</Text>

                            <Text h4>Titular: Alejandro Molina</Text>

                            <Text h4>Monto: 62,28$ </Text>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
            
        </ShopLayout>
    )
}

export default CheckoutPage;