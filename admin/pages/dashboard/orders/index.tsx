import { Text } from '@nextui-org/react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';

const OrdersPage = () => {
  return (
    <DashboardLayout 
        title='Tiendas'
        description='Pagina administrativa de Tienda'
    >
        <Text h1>Órdenes</Text>
        <Box
          css = {{width: '100%', display: 'table'}} 
        >
          
        </Box>
    </DashboardLayout>
  )
}

export default OrdersPage