import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Button, Link, Text, Card, Container } from '@nextui-org/react';
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
                    <Grid.Container key={ product.slug + product.size } css={{ mb: 1 }} gap={ 2 }>
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
                            <Container display='flex' direction='column'>
                                <Text size={"$2xl"}>{ product.title }</Text>
                                <Text size={"$2xl"}>Talla: <strong>{ product.size }</strong></Text>

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
                                        <Text size={"$2xl"}>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Text>
                                    )
                                }
                                
                            </Container>
                        </Grid>
                        <Grid xs={2} direction='column' alignItems='center'>
                            <Text size={"$2xl"}>{ `$${ product.price }` }</Text>
                            
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
            <Grid.Container key={ 2} css={{ mb: 1 }} gap={ 1 }>
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
                    <Container display='flex' direction='column' justify='center'>
                        <Text size={"$2xl"}>{ "Camisa Epica de Stranger Things" }</Text>
                        <Text size={"$2xl"}>Talla: <strong>{ "L" }</strong></Text>
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
                                <Text size={"$2xl"}>{ "Cantidad = 5" }</Text>
                            )
                        }
                                
                    </Container>
                </Grid>

                <Grid xs={2} direction='column' alignItems='center' justify='center'>
                        <Text size={"$2xl"}>{ `$${ 50 }` }</Text>
                            
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

            <Grid.Container key={ 2} css={{ mb: 1 }} gap={ 1 }>
                <Grid xs={3}>
                {/* TODO: llevar a la página del producto */}
                    <NextLink href={`/`} passHref>
                        <Link>
                            <Card>
                                <Card.Image 
                                    src={"https://cdn-3.expansion.mx/dims4/default/3f6562d/2147483647/strip/true/crop/1080x1350+0+0/resize/3600x4500!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F7a%2F93%2Fbc2dbe3b48108f0c64339c381298%2F171702773-462064728208538-3012039913661281230-n.jpg"}
                                />
                            </Card>
                        </Link>
                    </NextLink>
                </Grid>
                <Grid xs={7}>
                    <Container display='flex' direction='column' justify='center'>
                        <Text size={"$2xl"} >{ "Bella Modelo solo para ti" }</Text>
                        <Text size={"$2xl"}>Talla: <strong>{ "XHOT" }</strong></Text>
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
                                <Text size={"$2xl"}>{ "Cantidad = 1" }</Text>
                            )
                        }
                                
                    </Container>
                </Grid>

                <Grid xs={2} direction='column' alignItems='center' justify='center'>
                        <Text size={"$2xl"}>{ `$${ 50 }` }</Text>
                            
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
        </>
    )
}