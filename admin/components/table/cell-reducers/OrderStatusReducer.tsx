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
          color='warning'
          variant='bordered'
        >
          Procesando
        </Badge>
      );
    case "approved":
      return (
        <Badge 
          color='success'
          variant='bordered'
        >
          Aprobado
        </Badge>
      );
    case "shipped":
      return (
        <Badge 
          color='warning'
          variant='bordered'
        >
          Enviado
        </Badge>
      );
    case "canceled":
      return (
        <Badge 
          color='error'
          variant='bordered'
        >
          Cancelado
        </Badge>
      );
    case "delivered":
      return( 
        <Badge 
          color='success'
          variant='bordered'
        >
          Entregado
        </Badge>
      )
    default:
      return <></>
  }
}