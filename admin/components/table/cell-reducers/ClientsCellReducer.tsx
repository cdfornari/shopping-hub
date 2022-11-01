import { Badge, Text } from '@nextui-org/react';
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
        url={`/dashboard/stores/${row._id}`}
        onDelete={() => console.log()}
      />
    default:
      return <></>
  }
}