import { Badge, Text, useTheme } from '@nextui-org/react';
import { User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useSWRConfig } from 'swr';
import { api } from '../../../api/api';
import { AuthContext } from '../../../context/auth';
import { categoryReducer, sortSizes } from '../../../helpers';
import { Category, Size } from '../../../models/product';
import { Notification } from '../../../notification';
import { TableActions } from '../TableActions';
import { ProductCategoryReducer } from './ProductCategoryReducer';
import { ProductGenderReducer } from './ProductGenderReducer';

interface Row {
  _id: string
  title: string;
  image:string;
  category: Category;
  storeName: string;
  storeLogo: string;
  price: number;
  sizes: Size[];
  shoeSizes: number[];
  gender: string;
  active: boolean;
}

export const ProductsCellReducer = (row: Row, columnKey: string) => {
  const {isDark} = useTheme();
  const { mutate } = useSWRConfig()
  const { user } = useContext(AuthContext);
  const productAction = async (type: 'activate' | 'delete') => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      if(type === 'delete') await api.delete(`/products/${row._id}`,{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      else await api.post(`/products/activate/${row._id}`,{},{
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      Notification(isDark).fire({
        title: type === 'delete' ? 'Producto desactivado' : 'Producto activado',
        icon: 'success',
        timer: 3000
      })
      mutate(user?.role === 'STORE' ?  'products/my-products' : 'products?onlyActive=false')
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
        timer: 3000
      })
    }
  }
  switch (columnKey) {
    case "title":
      return (
        <User 
          name={row.title} 
          src={row.image} 
          description={categoryReducer(row.category)} 
          size="xl"
        />
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
        <>
          {
            row.category === 'shoes' ? (
              <Text>
              {row.shoeSizes.sort().join(',')}
            </Text>
            ) : (
              <Text>
                {sortSizes(row.sizes).join(',')}
              </Text>
            )
          }
        </>
      )
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
        url={`/dashboard/products/${row._id}`}
        onAction={productAction}
        type={row.active ? 'delete' : 'activate'}
      />
    default:
      return <></>
  }
}