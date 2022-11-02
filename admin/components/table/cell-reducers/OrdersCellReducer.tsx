import {  Badge, Text } from '@nextui-org/react';
import { Status } from '../../../models/Order';
import { TableActions } from '../TableActions';
import { OrderStatusReducer } from './OrderStatusReducer';

interface Row {
  _id: string
  orderName: string;
  dni: string;
  total: string;
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
          { `${ row.paymentMethod === 'zelle' ? "$": "bs"}${row.total}`}
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
        onDelete={() => console.log()}
      />
    default:
      return <></>
  }
}