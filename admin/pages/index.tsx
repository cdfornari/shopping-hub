import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, Grid, Text } from '@nextui-org/react'
import { AuthLayout } from '../layouts'

const Home: NextPage = () => {
  const {push} = useRouter()
  return (
    <AuthLayout
      title='Home'
      description='This is the home page'
    >
      <Grid.Container
        css={{
          w: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '@xsMax': {
            gap: '$15',
          },
        }}
      >
        <Grid xs={12} sm={6}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '$10',
          }}
        >
          <Text h1 size='$7xl'>Tienda</Text>
          <Button
            flat
            size='lg'
            onClick={() => push('/auth/store/register')}
          >
            Postúlate
          </Button>
          <Button
            flat
            size='lg'
            onClick={() => push('/auth/store/login')}
          >
            Inicia sesión
          </Button>
        </Grid>
        <Grid xs={12} sm={6}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '$10',
          }}
        >
          <Text h1 size='$7xl'>Administrador</Text>
          <Button
            flat
            size='lg'
            onClick={() => push('/auth/admin/login')}
          >
            Inicia sesión
          </Button>
        </Grid>
      </Grid.Container>
    </AuthLayout>
  )
}

export default Home
