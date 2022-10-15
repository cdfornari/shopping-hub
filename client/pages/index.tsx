import type { NextPage } from 'next'
import { ShopLayout } from '../layouts'
import { ProductCard } from '../components/ProductCard';
import { Grid } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Home'
      description='This is the home page'
    >
      <h1>Home</h1>
      <Grid.Container gap={4}>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <ProductCard />
        </Grid>
      </Grid.Container>
    </ShopLayout>
  )
}

export default Home
