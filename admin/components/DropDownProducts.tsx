import { useState, useMemo, FC } from 'react';
import { Badge, Dropdown, Text } from "@nextui-org/react";
import { CartProduct } from '../models/cart-product';
import { FaShoppingCart } from 'react-icons/fa'
import { OrderProduct } from '../models/OrderProduct';


interface Props{
    products:OrderProduct[];
}

export const DropDownProducts: FC<Props> = ( {products} ) => {

console.log( products )
  return (
    <Dropdown placement="bottom">
      <Dropdown.Trigger>
        <Badge color="error" content={ products.length }>
          <FaShoppingCart
            size={50}
          />
        </Badge>
      </Dropdown.Trigger>
      <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
        {
          products.map( ( product ) => (
            <Dropdown.Item key={ product._id } css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                {product.product.title}
              </Text>
          </Dropdown.Item>
          ))
        }
        
      </Dropdown.Menu>
  </Dropdown>
  );
}