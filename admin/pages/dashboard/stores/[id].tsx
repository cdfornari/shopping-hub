import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Grid, Image, Input, Spacer, Text, Badge, Col } from '@nextui-org/react';
import { FC } from 'react';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import { Store } from '../../../models/Store';

interface Props{
  store: Store;
}

const DetailsBrandsPage: FC<Props>= ( {store} ) => {  
  return (
    <DashboardLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <Text h1> { "Detalles de Tienda" } </Text>

        
        <Grid.Container gap={2} justify="center" >
            <Grid alignContent='space-between'   alignItems='center' xs={ 12 } sm={ 7 }>
              <Card isHoverable>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase">
                      LOGO
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Divider />
                <Card.Image 
                  src= {store.logo}
                  objectFit="cover"
                  width="absolute"
                  height={340}
                  alt="Card image background"
                />
              </Card> 
            </Grid>

            <Grid xs={12} sm={ 5 } direction="column">
                    <Spacer y={1} />
                    <Input
                        labelPlaceholder='Nombre'
                        value={store.name}
                        fullWidth
                        clearable
                        bordered
                        readOnly
                    />
                    <Spacer y={2} />
                    <Input
                        labelPlaceholder='RIF'
                        value={store.rif}
                        fullWidth
                        clearable
                        bordered
                        readOnly
                    />
                    <Spacer y={2} />

                    <Input
                        labelPlaceholder='Telefono'
                        value={store.phoneNumber}
                        fullWidth
                        clearable
                        bordered
                        readOnly
                    />
                    <Spacer y={2} />

                    <Input
                        labelPlaceholder='Correo'
                        value={store.user.email}
                        fullWidth
                        clearable
                        bordered
                        type={"email"}
                        readOnly
                    />
                    <Spacer y={2} />

                    <Badge 
                      color={store.user.isActive ? 'success' : 'error'}
                      variant='bordered'
                      css={{width: "100%", height: "100%"}}
                    >
                      {store.user.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                </Grid>
        </Grid.Container>
        
    </DashboardLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { token } = ctx.req.cookies;
  const { id = '' } = ctx.params as {id: string}; 
  const {data: store} = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stores/${id}`,
    {
      headers: { 
        Cookie: `token=${token};`, 
        Authorization: `Bearer ${token}`
      },
    }
  );

  

  if (!store) {
    return{
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {
      store,
    }
  }
}

export default DetailsBrandsPage