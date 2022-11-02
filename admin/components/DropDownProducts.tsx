import { useState, useMemo, FC } from 'react';
import { Badge, Dropdown, Text } from "@nextui-org/react";
import { CartProduct } from '../models/cart-product';
import { FaShoppingCart } from 'react-icons/fa'


interface Props{
    products: CartProduct[];
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
          products.map( ({_id, quantity}) => (
            <Dropdown.Item key={_id} css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                {quantity}
              </Text>
          </Dropdown.Item>
          ))
        }
        
      </Dropdown.Menu>
  </Dropdown>
  );
}