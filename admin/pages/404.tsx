import { Container, Text } from '@nextui-org/react';
import { DashboardLayout } from '../layouts/DashboardLayout';

const Custom404 = () => {
  return (
    <DashboardLayout title='Page not found' description='No hay nada que mostrar aquí'>
      <Container 
        display='flex' 
        justify='center'
        alignContent='center'
        alignItems='center'
        css={{
            height:'calc(100vh - 200px)',
            flexDirection: "column"
        }}
      >
        <Text size={'xxx-large'} weight="bold" >Error 404 |</Text>
        <Text size={'$xl'}  weight="bold">No se encontro ninguna página aquí</Text>
      </Container>
    </DashboardLayout>
  )
}

export default Custom404;