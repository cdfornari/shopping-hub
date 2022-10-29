import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Button, Link, Text, Card } from '@nextui-org/react';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;


    return (
        <>
            {
                productsToShow.map( (product: any) => (
                    <Grid.Container key={ product.slug + product.size }>
                        <Grid xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href={`/product/${ product.slug }`} passHref>
                                <Link>
                                    <Card>
                                        <Card.Image 
                                            src={`/products/${ product.image }`}
                                        />
                                    </Card>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid xs={7}>
                            <Grid justify='flex-start' direction='column'>
                                <Text h1>{ product.title }</Text>
                                <Text h1>Talla: <strong>{ product.size }</strong></Text>

                                {
                                    editable 
                                    ? (
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ 10 } 
                                            updatedQuantity={ ( value:any ) => onNewCartQuantityValue(product as ICartProduct, value )}
                                        />
                                    )
                                    : (
                                        <Text h5>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Text>
                                    )
                                }
                                
                            </Grid>
                        </Grid>
                        <Grid justify='flex-start' alignItems='center' direction='column'>
                            <Text h5>{ `$${ product.price }` }</Text>
                            
                            {
                                editable && (
                                    <Button 
                                         
                                        color='secondary' 
                                        onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid.Container>
                ))
            }
        </>
    )
}