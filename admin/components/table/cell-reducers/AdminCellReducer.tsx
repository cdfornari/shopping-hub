import { Badge, Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  _id: string
  email: string;
  active: boolean;
}

export const AdminCellReducer = (row: Row, columnKey: string) => {
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
          url={`/dashboard/admin/${row._id}`}
          onDelete={() => console.log()}
          edit={false}
        />
      )
    default:
      return <></>
  }
}