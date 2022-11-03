import { FC,useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Button, Link, Text, Card, Container } from '@nextui-org/react';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { ItemCounter } from '../ui/ItemCounter';
import { CartProduct } from '../../models';

interface Props {
    editable?: boolean;
    products: CartProduct[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
    const { updateProductQuantity, removeProduct } = useContext( ShoppingCartContext );
    return (
        <>
            {
                products.map ( (product) => ( 
                    <Grid.Container key={ 2} css={{ mb: 1 }} gap={ 1 }>
                        <Grid xs={3}>
                            <NextLink href={`/products/${product._id}`} passHref>
                                <Link>
                                    <Card>
                                        <Card.Image 
                                            src={ product.image }
                                            alt={ product.title }
                                        />
                                    </Card>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid xs={7}>
                            <Container display='flex' direction='column' justify='center'>
                                <Text size={"$2xl"}>{ product.title }</Text>
                                <Text size={"$2xl"}>Talla: <strong>{ product.size }</strong></Text>
                                {
                                    editable 
                                    ? (
                                        <ItemCounter 
                                            count={ product.quantity }
                                            maxValue={ 10 }
                                            onChange = { (value: number) => updateProductQuantity({...product, quantity: value} as CartProduct) } 
                                        />
                                    )
                                    : (
                                        <Text size={"$2xl"}>{ product.quantity }</Text>
                                    )
                                }
                                        
                            </Container>
                        </Grid>

                        <Grid xs={2} direction='column' alignItems='center' justify='center'>
                                <Text size={"$2xl"}>{ `$${ product.price }` }</Text>
                                    
                                    {
                                        editable && (
                                            <Button 
                                                light color="error" auto
                                                size={'sm'}
                                                
                                                onClick={ () => removeProduct( product as CartProduct ) }
                                            >
                                                Eliminar
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