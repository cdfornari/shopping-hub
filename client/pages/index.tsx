import type { NextPage } from 'next'
import { ShopLayout } from '../layouts'

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Home'
      description='This is the home page'
    >
      <h1>Home</h1>
    </ShopLayout>
  )
}

export default Home
