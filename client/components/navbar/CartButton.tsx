import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'

export const CartButton = () => {
    return (
        <NextLink
            href='/shopping-cart'
            passHref
        >
            <Link>
                <FaShoppingCart
                    size={20}
                />
            </Link>
        </NextLink>
    )
}