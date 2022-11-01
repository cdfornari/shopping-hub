import { useMemo } from 'react';
import { Loading, Text } from '@nextui-org/react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { TableWrapper } from '../../../components/table';
import useSWR from 'swr';
import { fetcher } from '../../../api/fetcher';
import { storesCellReducer } from '../../../components/table/cell-reducers/StoresCellReducer';
import { Store } from '../../../models/Store';

const columns = [
  { label: "Logo", uid: "logo" },
  { label: "Nombre", uid: "name" },
  { label: "Rif", uid: "rif" },
  { label: "Número de teléfono", uid: "phoneNumber" },
  { label: "Status", uid: "active" },
  { label: "Acciones", uid: "actions" },
];

const StoresPage = () => {
  const {data,error} = useSWR<Store[]>('stores', fetcher);
  
  const stores = useMemo(() => (
    data?.map((store,i) => ({
      id: i,
      active: store.user.isActive,
      ...store
    }))
  ),[data])
  if(error) return <Text>Error</Text>
  return (
    <DashboardLayout 
      title='Tiendas'
      description='Pagina administrativa de Tienda'
    >
      <Text h1>Tiendas</Text>
      {
        data ? (
          <Box
            css={{width: '100%'}} 
          >
            <TableWrapper
              columns={columns}
              rows={stores!}
              cellReducer={storesCellReducer}
            />
          </Box>
        ) : <Loading/>
      }
    </DashboardLayout>
  )
}

export default StoresPage

