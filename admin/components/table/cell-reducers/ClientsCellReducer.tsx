import { Badge, Text, useTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';
import { api } from '../../../api/api';
import { Notification } from '../../../notification';
import { TableActions } from '../TableActions';

interface Row {
  _id: string
  email: string;
  dni: string;
  phoneNumber: string;
  fullName: string;
  active: boolean;
}

export const ClientsCellReducer = (row: Row, columnKey: string) => {
  const {isDark} = useTheme();
  const { mutate } = useSWRConfig()
  const clientAction = async (type: 'activate' | 'delete') => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      if(type === 'delete') await api.delete(`/clients/${row._id}`,{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      else await api.post(`/clients/activate/${row._id}`,{},{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      Notification(isDark).fire({
        title: type === 'delete' ? 'Cliente eliminado' : 'Cliente activado',
        icon: 'success',
        timer: 3000
      })
      mutate('clients')
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
    case "fullName":
      return (
        <Text>
          {row.fullName}
        </Text>
      );
    case "dni":
      return (
        <Text>
          {row.dni}
        </Text>
      );
    case "phoneNumber":
        return (
          <Text>
            {row.phoneNumber}
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
      return <TableActions
        url={`/dashboard/clients/${row._id}`}
        onAction={clientAction}
        type={row.active ? 'delete' : 'activate'}
      />
    default:
      return <></>
  }
}