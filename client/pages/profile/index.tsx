import { useContext } from 'react'
import { Card, Spacer, Text, Button, Input, Loading } from '@nextui-org/react';
import { Client } from '../../models/Client'
import { Box } from '../../../admin/components/containers/Box';
import { AuthLayout } from '../../layouts/AuthLayout';
import { ThemeSwitcher } from '../../components/navbar/ThemeSwitcher';
import { AuthContext } from '../../context/auth';

export const ProfilePage = () => {
  const {user} = useContext(AuthContext)
  return (
    <AuthLayout
      title="Perfil"
      description="Profile"
    >
      <Card 
        variant='bordered'
        css={{
          width: 'fit-content',
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
          <Text h1>Mi perfil</Text>
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
                  initialValue={user?.user.email}  
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
        <Card.Footer>
          <Box
            css={{
              gap: '$6',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              light
            >
              Mis Órdenes
            </Button>
            <Button
              light
              color='error'
            >
              Volver
            </Button>
          </Box>
          <Spacer x={6} />
          <ThemeSwitcher/>
        </Card.Footer>
      </Card>
    </AuthLayout>
  )
}

export default ProfilePage
