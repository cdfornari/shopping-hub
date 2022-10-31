import { useMemo } from 'react';
import { Loading, Text } from '@nextui-org/react';
import useSWR from 'swr';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { TableWrapper } from '../../../components/table';
import { fetcher } from '../../../api/fetcher';
import { UserProps } from '../../../models/User';
import { AdminCellReducer } from '../../../components/table/cell-reducers/AdminCellReducer';

const columns = [
  { label: "Email", uid: "email" },
  { label: "Status", uid: "active" },
];

const AdminPage = () => {
  const {data,error} = useSWR<UserProps[]>('admin', fetcher);
  const users = useMemo(() => (
    data?.map((user,i) => ({
      id: i,
      active: user.isActive,
      ...user
    }))
  ),[data])
  if(error) return <Text>Error</Text>
  return (
    <DashboardLayout 
      title='administradores'
      description='tabla de administradores'
    >
      <Text h1>Administradores</Text>
      {
        data ? (
          data.length > 0 ? (
            <Box
                css={{width: '100%'}} 
            >
                <TableWrapper
                columns={columns}
                rows={users!}
                cellReducer={AdminCellReducer}
                />
            </Box>
          ) : <Text>No hay administradores</Text>
        ) : <Loading/>
      }
    </DashboardLayout>
  )
}

export default AdminPage

