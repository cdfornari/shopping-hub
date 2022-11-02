import { Badge, Text } from '@nextui-org/react';
import { User } from "@nextui-org/react";
import { TableActions } from '../TableActions';

interface Row {
  _id: string
  title: string;
  image:string;
  category: string;
  storeName: string;
  storeLogo: string;
  price: number;
  sizes: string[];
  gender: string;
}

export const ProductsCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "title":
      return (
        <User 
            name={row.title} 
            src={row.image} 
            description={row.category} 
            size="xl"/>
      );
    case "category":
      return (
        <Text>
          {row.category}
        </Text>
      );
    case "gender":
      return (
        <Text>
          {row.gender}
        </Text>
      );
    case "store":
      return (
        <User name={row.storeName} src={row.storeLogo}/>
      );
    case "price":
      return(
        <Text>
          {row.price}
        </Text>
      )
    case "sizes":
     return(
        <Text>
            {row.sizes.join(',')}
        </Text>
        )
    case "actions": 
      return <TableActions
        url={`/dashboard/products/${row._id}`}
        onDelete={() => console.log()}
      />
    default:
      return <></>
  }
}