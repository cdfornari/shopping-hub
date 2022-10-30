import { Button, Card, Container, Grid, Input, Link, Row, Spacer, Text } from '@nextui-org/react';
import NextLink from 'next/link'
import React from 'react'
import { Box } from '../../../../admin/components/containers/Box';

export const RegisterPage = () => {
  
    return (
        <>
        <Container css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card css={{ padding: '25px', maxWidth: '450px' }} variant="shadow">
            <Text h3 css={{marginBlock: '25px', alignSelf: 'center'}}>Crear cuenta</Text>
            <Input clearable bordered color="primary" placeholder="Nombre" size="xl" fullWidth/>
            <Spacer y={1.5} />
            <Input clearable bordered color="primary" placeholder="Correo" size="xl" fullWidth/>
            <Spacer y={1.5} />
            <Input.Password clearable bordered color="primary" placeholder="Contraseña" size="xl" fullWidth/>
            <Spacer y={1.5} />
            <Input clearable bordered color="primary" placeholder="DNI" size="xl" fullWidth/>
            <Spacer y={1.5} />
            <Input clearable bordered color="primary" placeholder="Numero telefono" size="xl" fullWidth/>
            <Spacer y={1.5} />
            <Row css={{justifyContent: 'end', marginBlock: '15px'}}>
                  <NextLink href="/auth/login" passHref>
                      <Link underline='true'>
                           ¿Ya tienes una cuenta?
                      </Link>
                  </NextLink>
            </Row>
            <Spacer y={1} />
            <Button shadow size={'lg'}>Registrarse</Button>
          </Card>
        </Container>
      </>
  )
}

export default RegisterPage