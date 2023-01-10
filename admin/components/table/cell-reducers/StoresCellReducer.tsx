import { Avatar, Badge, Text, useTheme } from '@nextui-org/react';
import { useSWRConfig } from 'swr';
import Cookies from 'js-cookie';
import { api } from '../../../api/api';
import { Notification } from '../../../notification';
import { TableActions } from '../TableActions';

interface Row {
  _id: string
  logo: string;
  name: string;
  rif: string;
  phoneNumber: string;
  active: boolean;
}

export const StoresCellReducer = (row: Row, columnKey: string) => {
  const {isDark} = useTheme();
  const { mutate } = useSWRConfig()
  const storeAction = async (type: 'activate' | 'delete') => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      if(type === 'delete') await api.delete(`/stores/${row._id}`,{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      else await api.post(`/stores/activate/${row._id}`,{},{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      Notification(isDark).fire({
        title: type === 'delete' ? 'Tienda desactivada' : 'Tienda activada',
        icon: 'success',
        timer: 3000
      })
      mutate('stores')
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
        timer: 3000
      })
    }
  }
  switch (columnKey) {
    case "logo":
      return (
        <Avatar
          squared 
          size='xl'
          src={row.logo} 
          bordered
          color='gradient'
        />
      );
    case "name":
      return (
        <Text>
          {row.name}
        </Text>
      );
    case "rif":
      return (
        <Text>
          {row.rif}
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
        url={`/dashboard/stores/${row._id}`}
        onAction={storeAction}
        type={row.active ? 'delete' : 'activate'}
      />
    default:
      return <></>
  }
}