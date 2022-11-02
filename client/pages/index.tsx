import type { NextPage } from 'next'
import { Grid, Loading, Text } from '@nextui-org/react';
import useSWR from 'swr';
import { ShopLayout } from '../layouts'
import { ProductCard } from '../components/ProductCard';
import { fetcher } from '../api/fetcher';
import { Product } from '../models';

const Home: NextPage = () => {
  const {data,error} = useSWR<Product[]>('products',fetcher);
  if(error) return <Text>Error</Text>
  return (
    <ShopLayout
      title='Home'
      description='Shopping Hub - best place to buy clothing'
    >
      {
        !data ? (
          <Loading/>
        ) : (
          <Grid.Container gap={4} css={{w:'100vw', px: '$24'}}>
           {
            data.map((product) => (
              <Grid xs={12} sm={6} md={4}>
                <ProductCard 
                  key={product._id}
                  product={product}
                />
              </Grid>
            ))
           }
          </Grid.Container>
        )
      }
    </ShopLayout>
  )
}

export default Home
