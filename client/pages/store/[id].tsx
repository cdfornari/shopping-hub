import { Container, Divider, Grid, Loading, Row, Text } from "@nextui-org/react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import axios from 'axios';
import { ShopLayout } from "../../layouts";
import { Product} from "../../models";
import { Store} from "../../models/Store";

import { ProductCard } from "../../components/ProductCard";
import useSWR from "swr";
import { fetcher } from "../../api/fetcher";
import { productFilterByStore } from "../../helpers/ProductFilterByStore";
import { useRouter } from "next/router";
// interface Props{
//   store: Store;
// }


const ShopDetails: NextPage = () => {
  const {data,error} = useSWR<Product[]>('products',fetcher);
  const router = useRouter();
  const {id}= router.query;
  const products = productFilterByStore(data,id);
  if(error) return <Text>Error</Text>
  return (
  <ShopLayout
    title ='Shop page'
    description='This is the store page'
    >
      <Container css={{width:'100%'}} justify='center'>
        <Row justify="center">
          <Text h1>{id}</Text>
        </Row>
      </Container>
            {
        !products ? (
          <Loading/>
        ) : (
          <Grid.Container gap={4} css={{w:'100vw', px: '$24'}}>
           {
            products.map((product) => (
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

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const {id = ''} = ctx.params as {id: string};
//   const {data: product} = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
//   if(!product) {
//       return {
//           redirect: {
//               destination: '/404',
//               permanent: false
//           }
//       }
//   }
//   return {
//       props: {
//           product
//       }
//   }   
// }


export default ShopDetails;