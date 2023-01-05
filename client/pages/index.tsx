import type { NextPage } from 'next'
import { Grid, Loading, Text, Container, User, Button } from '@nextui-org/react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { ShopLayout } from '../layouts'
import { ProductCard } from '../components/products/ProductCard';
import { fetcher } from '../api/fetcher';
import { Category, Gender, Product } from '../models';
import { categoryReducer, genderReducer } from '../helpers';

const Home: NextPage = () => {
  const {query,replace} = useRouter()
  const {gender,category,store} = query;
  const {data,error} = useSWR<Product[]>(`products?onlyActive=true&gender=${gender || ''}&category=${category || ''}&store=${store || ''}`,fetcher);
  if(error) return <Text>Error</Text>
  return (
    <ShopLayout
      title='Home'
      description='Shopping Hub - best place to buy clothing'
    >
      {
        data && data.length === 0 && (
          <Container>
            <Text>
              No hay productos disponibles con los filtros seleccionados
            </Text>
            <Button
              flat
              color='error'
              size='sm'
              onClick={() => replace('/')}
              css={{mt: '$4'}}
            >
              Limpiar filtros
            </Button>
          </Container>
        )
      }
      {
        data && data.length > 0 && (
          <Container>
            {
              store && (
                <User
                  size='xl'
                  src={data[0].store.logo}
                  name={data[0].store.name}
                />
              )
            }
            {
              gender && (
                <Text h3>
                  Género: {genderReducer(gender as Gender)}
                </Text>
              )
            }
            {
              category && (
                <Text h3>
                  Categoría: {categoryReducer(category as Category)}
                </Text>
              )
            }
          </Container>
        )
      }
      {
        !data ? (
          <Loading/>
        ) : (
          <Grid.Container gap={4} css={{w:'100vw', px: '$24'}}>
            {
              data.map((product) => (
                <Grid xs={12} sm={6} md={4} key={product._id}>
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
