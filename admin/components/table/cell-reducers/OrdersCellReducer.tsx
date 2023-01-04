import { Text } from '@nextui-org/react';
import { Status } from '../../../models/Order';
import { TableActions } from '../TableActions';
import { OrderStatusReducer } from './OrderStatusReducer';

interface Row {
  _id: string
  orderName: string;
  dni: string;
  total: number;
  paymentMethod: string;
  status: Status;
}

export const OrdersCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "orderName":
      return (
        <Text>
          {row.orderName}
        </Text>
      );
    case "dni":
      return (
        <Text>
          {row.dni}
        </Text>
      );
    case "total":
      return (
        <Text>
          { `${ row.paymentMethod === 'zelle' ? "$": "Bs."}${row.total.toFixed(2)}`}
        </Text>
      );
    case "paymentMethod":
      return (
        <Text>
          {row.paymentMethod}
        </Text>
      );
    case "status":
      return( 
        <OrderStatusReducer statusKey={ row.status } />
      )
    case "actions": 
      return <TableActions
        url={`/dashboard/orders/${row._id}`}
        showDelete={false}
      />
    default:
      return <></>
  }
}