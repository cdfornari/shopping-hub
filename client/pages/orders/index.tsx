import { Loading, Text } from '@nextui-org/react';
import { useMemo } from 'react';
import { Box } from '../../components/containers';
import { TableWrapper } from '../../components/table';
import { OrdersCellReducer } from '../../components/table/cell-reducers/OrdersCellReducer';
import { ShopLayout } from '../../layouts';
import useSWR from 'swr';
import { fetcher } from '../../api/fetcher';
import { Order } from '../../models/Order';

const columns = [
  { label: "Cliente", uid: "orderName" },
  { label: "Cedula", uid: "dni" },
  { label: "Total", uid: "total" },
  { label: "Metodo de Pago", uid: "paymentMethod" },
  { label: "Status", uid: "status" },
  { label: "Acciones", uid: "actions" },
];

const OrdersPage = () => {
  const {data,error} = useSWR<Order[]>('orders/my-orders', fetcher);
  console.log(data)

  const orders = useMemo(() => (
    data?.map((order,i) => ({
      id: i,
      orderName: order.client.fullName,
      dni: order.client.dni,
      ...order
    }))
  ),[data])
  if(error) return <Text>Error</Text>

  return (
    <ShopLayout 
        title='Órdenes'
        description='Pagina administrativa de las Ordenes'
    >
        <Text h1>Órdenes</Text>
        {
        data ? (
          <Box
            css={{width: '100%'}} 
          >
            <TableWrapper
              columns={columns}
              rows={orders!}
              cellReducer={ OrdersCellReducer }
            />
          </Box>
        ) : <Loading/>
      }
    </ShopLayout>
  )
}

export default OrdersPage