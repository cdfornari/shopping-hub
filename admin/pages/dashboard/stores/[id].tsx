import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Grid, Image, Input, Spacer, Text, Badge, Col } from '@nextui-org/react';
import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { api } from '../../../api/api';
import Cookies from 'js-cookie';

interface Props{

}

const DetailsBrandsPage: FC<Props>= ( props ) => {
  console.log({props})
  return (
    <DashboardLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <Text h1> { "Apa" } </Text>

        
        <Grid.Container gap={2} justify="center" >
            <Grid alignContent='space-between'   alignItems='center' xs={ 12 } sm={ 6 }>
              <Card>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                      logo
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Divider />
                <Card.Image 
                  src='https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true'
                  objectFit="cover"
                  width="100%"
                  height={340}
                  alt="Card image background"
                />
              </Card> 
            </Grid>

            <Grid xs={12} sm={ 6 } direction="column">
                    <Spacer y={1} />
                    <Input
                        labelPlaceholder='RIF'
                        fullWidth
                        clearable
                        bordered
                    />
                    <Spacer y={2} />

                    <Input
                        labelPlaceholder='Telefono'
                        fullWidth
                        clearable
                        bordered
                    />
                    <Spacer y={2} />

                    <Input
                        labelPlaceholder='Correo'
                        fullWidth
                        clearable
                        bordered
                        type={"email"}
                    />
                    <Spacer y={2} />

                    <Badge 
                      //color={row.active ? 'success' : 'error'}
                      variant='bordered'
                      css={{width: "100%", height: "100%"}}
                    >
                      {/* {row.active ? 'Activo' : 'Inactivo'} */}
                      Active
                    </Badge>
                </Grid>
        </Grid.Container>
        
    </DashboardLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params as {id: string};

  //const { data } = await api.get( `/stores/${id}`)



  return {
    props: {
      id
    }
  }
}

export default DetailsBrandsPage