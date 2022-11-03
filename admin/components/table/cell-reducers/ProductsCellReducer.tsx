import { Text } from '@nextui-org/react';
import { User } from "@nextui-org/react";
import { TableActions } from '../TableActions';
import { ProductCategoryReducer } from './ProductCategoryReducer';
import { ProductGenderReducer } from './ProductGenderReducer';

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
        <ProductCategoryReducer statusKey= {row.category} />
      );
    case "gender":
      return (
        <ProductGenderReducer statusKey= {row.gender} />
      );
    case "store":
      return (
          <User name={row.storeName} src={row.storeLogo}/>
      );
    case "price":
      return(
        <Text>
          ${row.price.toFixed(2)}
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