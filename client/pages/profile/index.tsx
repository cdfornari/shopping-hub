import { useContext } from 'react'
import { AuthContext } from '../../context/auth';
import { Card, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { Box } from '../../components/containers';
import { ShopLayout } from '../../layouts/ShopLayout';

export const ProfilePage = () => {
  const {user} = useContext(AuthContext)
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
              user ? (
                <>
                  <Input
                    bordered
                    readOnly
                    labelPlaceholder="Nombre Completo" 
                    initialValue={user?.fullName} 
                    size='lg'
                  />
                  <Input
                    bordered
                    readOnly
                    labelPlaceholder="Email" 
                    initialValue={user?.user?.email}  
                    size='lg'
                  />
                  <Input 
                    bordered 
                    readOnly
                    labelPlaceholder="Documento de Identidad" 
                    initialValue={user?.dni} 
                    size='lg'
                  />
                  <Input 
                    bordered
                    labelPlaceholder="Número de teléfono"
                    readOnly
                    initialValue={user?.phoneNumber} 
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

export default ProfilePage
