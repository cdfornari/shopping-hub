import { Badge, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { useContext, useMemo } from 'react';
import { FaShoppingCart } from 'react-icons/fa'
import { ShoppingCartContext } from '../../context/shopping-cart';

export const CartButton = () => {
    const { products } = useContext( ShoppingCartContext );
    const quantity = useMemo(
        () => products.reduce((acc, product) => acc + product.quantity, 0),
        [products]
    )   
    return (
        <NextLink
            href='/shopping-cart'
            passHref
        >
            <Link>
                <Badge color="error" content={ quantity > 9 ? '+9': quantity }>
                    <FaShoppingCart
                        size={28}
                    />
                </Badge>
            </Link>
        </NextLink>
    )
}