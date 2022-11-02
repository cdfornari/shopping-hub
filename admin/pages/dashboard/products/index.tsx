import { useMemo } from 'react';
import { Loading, Text } from '@nextui-org/react';
import useSWR from 'swr';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { TableWrapper } from '../../../components/table';
import { fetcher } from '../../../api/fetcher';
import { NextPage } from 'next';
import { Product } from '../../../models/product';
import { ProductsCellReducer } from '../../../components/table/cell-reducers/ProductCellReducer';


const columns = [
  { label: "Titulo", uid: "title" },
  { label: "Tienda", uid: "store" },
  { label: "Precio", uid: "price" },
  { label: "Genero", uid: "gender" },
  { label: "Tallas", uid: "sizes" },
  { label: "Acciones", uid: "actions" },
];


const ProductsPage: NextPage = () => {
  const {data,error} = useSWR<Product[]>('products', fetcher);
  const products = useMemo(() => (
    data?.map((product,i) => ({
      id: i,
      storeName: product.store.name,
      storeLogo: product.store.logo,
      ...product
    }))
  ),[data])
  console.log(products)
  if(error) return (<Text>Error</Text>)
  return (
    <DashboardLayout 
      title='Productos'
      description='tabla de productos'
    >
      <Text h1>Productos</Text>
      {
        data ? (
          data.length > 0 ? (
            <Box
                css={{width: '100%'}} 
            >
                <TableWrapper
                    columns={columns}
                    rows={products!}
                    cellReducer={ProductsCellReducer}
                />
            </Box>
          ) : <Text>No hay productos</Text>
        ) : <Loading/>
      }
    </DashboardLayout>
  )
}

export default ProductsPage

