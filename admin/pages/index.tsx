import type { NextPage } from 'next'
import { DashboardLayout } from '../layouts'
import { Flex } from '../components/containers'

const Home: NextPage = () => {
  return (
    <DashboardLayout
      title='Home'
      description='This is the home page'
    >
      <Flex
        css={{
          'mt': '$5',
          'px': '$6',
          '@sm': {
              mt: '$10',
              px: '$16',
          },
        }}
        justify='center'
        direction='column'
      >
        <h1>Home</h1>
      </Flex>
    </DashboardLayout>
  )
}

export default Home
