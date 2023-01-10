import { Badge, Text, useTheme } from '@nextui-org/react';
import { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import { api } from '../../../api/api';
import { Notification } from '../../../notification';
import { TableActions } from '../TableActions';

interface Row {
  _id: string
  email: string;
  active: boolean;
}

export const AdminCellReducer = (row: Row, columnKey: string) => {
  const {isDark} = useTheme();
  const { mutate } = useSWRConfig()
  const adminAction = async (type: 'activate' | 'delete') => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      if(type === 'delete') await api.delete(`/admin/${row._id}`,{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      else await api.post(`/admin/activate/${row._id}`,{},{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      Notification(isDark).fire({
        title: type === 'delete' ? 'Administrador eliminado' : 'Administrador activado',
        icon: 'success',
        timer: 3000
      })
      mutate('admin')
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
        timer: 3000
      })
    }
  }
  switch (columnKey) {
    case "email":
      return (
        <Text>
          {row.email}
        </Text>
      );
    case "active":
      return( 
        <Badge 
          color={row.active ? 'success' : 'error'}
          variant='bordered'
        >
          {row.active ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    case "actions": 
      return (
        <TableActions
          url=''
          onAction={adminAction}
          edit={false}
          type={row.active ? 'delete' : 'activate'}
        />
      )
    default:
      return <></>
  }
}