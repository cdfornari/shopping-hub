import { Button, Card, Checkbox, Container, Input, Link, Row, Spacer, Text } from '@nextui-org/react'
import React from 'react'
import NextLink from 'next/link'

export const LoginPage = () => {
  return (
    <>
      <Container css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card css={{ padding: '25px', maxWidth: '400px' }} variant="shadow">
          <Text h3 css={{marginBlock: '25px', alignSelf: 'center'}}>Iniciar sesion</Text>
          <Input clearable bordered color="primary" placeholder="Correo" size="xl" fullWidth/>
          <Spacer y={1.5} />
          <Input.Password clearable bordered color="primary" placeholder="Contraseña" size="xl" fullWidth/>
          <Spacer y={1.5} />
          <Row css={{display: 'flex', justifyContent: 'space-between'}}>
            <Checkbox>
                <Text size={16}>Recuerdame</Text>
            </Checkbox>
               <Text size={16}>Olvido contraseña</Text>
          </Row>
          <Row css={{justifyContent: 'end', marginBlock: '15px'}}>
                <NextLink href="/auth/register" passHref>
                    <Link underline='true'>
                         ¿No tienes una cuenta?
                    </Link>
                </NextLink>
          </Row>
          <Spacer y={1} />
          <Button shadow size={'lg'}>Ingresar</Button>
        </Card>
      </Container>
    </>
  )
}

export default LoginPage