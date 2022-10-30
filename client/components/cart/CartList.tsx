import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Button, Link, Text, Card, Spacer } from '@nextui-org/react';
import { ItemCounter } from '../ui/ItemCounter';
// import { ItemCounter } from '../ui';
// import { CartContext } from '../../context';
// import { ICartProduct, IOrderItem } from '../../interfaces';



interface Props {
    editable?: boolean;
    //products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false }) => {

    //const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    // const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    //     product.quantity = newQuantityValue;
    //     updateCartQuantity( product );
    // }

    //const productsToShow = products ? products : cart;


    return (
        <>
            {/* {
                productsToShow.map( (product: any) => (
                    <Grid.Container key={ product.slug + product.size }>
                        <Grid xs={3}>
                            {/* TODO: llevar a la página del producto *} 
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
                                            count={0}
                                            maxValue={ 10 }
                                            //onChange = { (value: number) => updateProductQuantity({...product, quantity: value} as iCartProduct) }
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
                                    light color="error" auto
                                    size={'sm'}
                                        //onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                    Delete
                                </Button>
                                )
                            }
                        </Grid>
                    </Grid.Container>
                ))
            } */}
            

            <Grid.Container key={ 2} css={{ mb: 1 }} gap={ 2 }>
                <Grid xs={3}>
                {/* TODO: llevar a la página del producto */}
                    <NextLink href={`/`} passHref>
                        <Link>
                            <Card>
                                <Card.Image 
                                    src={"https://netflix-shop.imgix.net/products/HFC-MET-RAG-1_1032x.jpg"}
                                />
                            </Card>
                        </Link>
                    </NextLink>
                </Grid>
                <Grid xs={7}>
                    <Grid direction='column'>
                        <Text h3>{ "Camisa Epica de Stranger Things" }</Text>
                        <Text h3>Talla: <strong>{ "L" }</strong></Text>
                        {
                            editable 
                            ? (
                                <ItemCounter 
                                    count={0}
                                    maxValue={ 10 }
                                    //onChange = { (value: number) => updateProductQuantity({...product, quantity: value} as iCartProduct) } 
                                />
                            )
                            : (
                                // <Text h5>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Text>
                                <Text h5>{ "Cantidad = 5" }</Text>
                            )
                        }
                                
                    </Grid>
                    <Grid direction='column'>
                        <Text h4>{ `$${ 50 }` }</Text>
                            
                            {
                                editable && (
                                    <Button 
                                        light color="error" auto
                                        size={'sm'}
                                         
                                        //onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                        Delete
                                    </Button>
                                )
                            }
                    </Grid>
                </Grid> 
            </Grid.Container>   
        </>
    )
}