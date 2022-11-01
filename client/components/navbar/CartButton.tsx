import { Badge, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa'
import { ShoppingCartContext } from '../../context/shopping-cart';

export const CartButton = () => {
    const { products } = useContext( ShoppingCartContext );
    return (
        <NextLink
            href='/shopping-cart'
            passHref
        >

            <Link>
                <Badge color="error" content={ products.length > 9 ? '+9': products.length }>
                    <FaShoppingCart
                        size={28}
                    />
                </Badge>
            </Link>
        </NextLink>
    )
}