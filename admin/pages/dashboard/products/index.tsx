import { useMemo, useContext } from 'react';
import { Loading, Text } from '@nextui-org/react';
import useSWR from 'swr';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { TableWrapper } from '../../../components/table';
import { fetcher } from '../../../api/fetcher';
import { NextPage } from 'next';
import { Product } from '../../../models/product';
import { ProductsCellReducer } from '../../../components/table/cell-reducers/ProductsCellReducer';
import { AuthContext } from '../../../context/auth/AuthContext';


const columns = [
  { label: "Titulo", uid: "title" },
  { label: "Tienda", uid: "store" },
  { label: "Precio", uid: "price" },
  { label: "Genero", uid: "gender" },
  { label: "Tallas", uid: "sizes" },
  { label: "Acciones", uid: "actions" },
];


const ProductsPage: NextPage = () => {
    const { user } = useContext(AuthContext);
    const {data,error} = useSWR<Product[]>(user?.role === 'ADMIN' ?  'products' : 'products/my-products', fetcher);
    console.log(data)
  const products = useMemo(() => (
    data?.map((product,i) => ({
      id: i,
      storeName: product.store.name,
      storeLogo: product.store.logo,
      ...product
    }))
  ),[data])
  
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