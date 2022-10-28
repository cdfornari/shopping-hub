import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box, Flex } from '../../../components/containers';
import TableInfo from "../../../components/table/index"

const columns = [
  { name: "CLIENTE", uid: "logo" },
  { name: "Nro. Productos", uid: "name" },
  { name: "Precio Total", uid: "rif" },
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
          <TableInfo columns = { columns } url = {`/dashboard/order/${1}`} />
        </Box>
    </DashboardLayout>
  )
}

export default OrdersPage