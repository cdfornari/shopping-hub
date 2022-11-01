import { useMemo } from 'react';
import { Loading, Text } from '@nextui-org/react';
import useSWR from 'swr';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { TableWrapper } from '../../../components/table';
import { fetcher } from '../../../api/fetcher';
import { ClientsCellReducer } from '../../../components/table/cell-reducers/ClientsCellReducer';
import { Client } from '../../../models/Client';

const columns = [
  { label: "Nombre", uid: "fullName" },
  { label: "Email", uid: "email" },
  { label: "Cedula", uid: "dni" },
  { label: "Telefono", uid: "phoneNumber" },
  { label: "Status", uid: "active" },
  { label: "Acciones", uid: "actions" },
];

const ClientsPage = () => {
  const {data,error} = useSWR<Client[]>('clients', fetcher);
  const clients = useMemo(() => (
    data?.map((client,i) => ({
      id: i,
      active: client.user.isActive,
      email: client.user.email,
      ...client
    }))
  ),[data])
  if(error) return <Text>Error</Text>
  return (
    <DashboardLayout 
      title='Clientes'
      description='tabla de clientes'
    >
      <Text h1>Clientes</Text>
      {
        data ? (
          data.length > 0 ? (
            <Box
                css={{width: '100%'}} 
            >
                <TableWrapper
                    columns={columns}
                    rows={clients!}
                    cellReducer={ClientsCellReducer}
                />
            </Box>
          ) : <Text>No hay clientes</Text>
        ) : <Loading/>
      }
    </DashboardLayout>
  )
}

export default ClientsPage

