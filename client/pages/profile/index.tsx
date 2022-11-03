import { GetServerSideProps, NextPage } from 'next';
import { Card, Input, Loading, Text } from '@nextui-org/react';
import axios from 'axios';
import { Box } from '../../components/containers';
import { ShopLayout } from '../../layouts/ShopLayout';
import { Client } from '../../models/Client';

interface Props {
  client: Client;
}

export const ProfilePage: NextPage<Props> = ({client}) => {
  return (
    <ShopLayout
      title="Perfil"
      description="Profile"
    >
      <Box
        css={{
          width: '100%',
          mt: '$10',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          variant='bordered'
          css={{
            width: 'fit-content',
            minWidth: '400px',
            py: '$15',
            px: '$10',
          }}
        >
          <Card.Header
            css={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text h1>Mi Perfil</Text>
          </Card.Header>
          <Card.Body
            css={{
              gap: '$17',
              display: 'flex',
              py: '$12',
            }}
          >
            {
              client ? (
                <>
                  <Input
                    bordered
                    readOnly
                    labelPlaceholder="Nombre Completo" 
                    initialValue={client.fullName} 
                    size='lg'
                  />
                  <Input
                    bordered
                    readOnly
                    labelPlaceholder="Email" 
                    initialValue={client.user.email}  
                    size='lg'
                  />
                  <Input 
                    bordered 
                    readOnly
                    labelPlaceholder="Documento de Identidad" 
                    initialValue={client.dni} 
                    size='lg'
                  />
                  <Input 
                    bordered
                    labelPlaceholder="Número de teléfono"
                    readOnly
                    initialValue={client.phoneNumber} 
                    size='lg'
                  />
                </>
              ) : (
                <Loading/>
              )
            }
          </Card.Body>
        </Card>
      </Box>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  const {data: client} = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/current`,
    {
      headers: { 
        Cookie: `token=${token};`, 
        Authorization: `Bearer ${token}`
      },
    }
  );
  
  if (!client) {
    return{
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      client,
    }
  }
}

export default ProfilePage
