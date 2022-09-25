import type { NextPage } from 'next'
import { DashboardLayout } from '../layouts'

const Home: NextPage = () => {
  return (
    <DashboardLayout
      title='Home'
      description='This is the home page'
    >
      <h1>Home</h1>
    </DashboardLayout>
  )
}

export default Home
