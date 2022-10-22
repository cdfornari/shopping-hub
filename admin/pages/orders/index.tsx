import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Box, Flex } from '../../components/containers';
import TableInfo from "../../components/table/index"

const columns = [
  { name: "LOGO", uid: "logo" },
  { name: "NAME", uid: "name" },
  { name: "RIF", uid: "rif" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const OrdersPage = () => {
  return (
    <DashboardLayout 
        title='Tiendas'
        description='Pagina administrativa de Tienda'
    >
        <h1>Tienda</h1>
        <Box
          css = {{width: '100%', display: 'table'}} 
        >
          <TableInfo columns = { columns } />
        </Box>
    </DashboardLayout>
  )
}

export default OrdersPage