import {  Badge } from '@nextui-org/react';
import { FC } from 'react';

interface Props{
    statusKey: string;
}

export const OrderStatusReducer: FC<Props> = ({statusKey}) => {
  switch (statusKey) {
    case "pending":
      return (
        <Badge 
            color= 'warning'
            variant='bordered'
        >
            pending
        </Badge>
      );
    case "approved":
      return (
        <Badge 
            color={'success'}
            variant='bordered'
        >
            approved
        </Badge>
      );
    case "shipped":
      return (
        <Badge 
            color={ 'secondary'}
            variant='bordered'
        >
            shipped
        </Badge>
      );
    case "canceled":
      return (
        <Badge 
            color={'error'}
            variant='bordered'
        >
            canceled
        </Badge>
      );
    case "delivered":
      return( 
        <Badge 
            color={'primary'}
            variant='bordered'
        >
            delivered
        </Badge>
      )
    default:
      return <></>
  }
}