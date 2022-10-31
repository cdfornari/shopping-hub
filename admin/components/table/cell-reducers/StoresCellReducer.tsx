import { Avatar, Badge, Text } from '@nextui-org/react';
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
        onDelete={() => console.log()}
      />
    default:
      return <></>
  }
}