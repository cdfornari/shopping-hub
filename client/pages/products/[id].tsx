import { useContext, useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Button, Grid, Image, Spacer, Text, Textarea, User, useTheme } from '@nextui-org/react';
import { ItemCounter } from "../../components/ui/ItemCounter";
import axios from 'axios';
import { ShopLayout } from "../../layouts";
import { Product, Size } from '../../models';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { Notification } from '../../notification';

interface Props {
    product: Product;
}

const ProductPage: NextPage<Props> = ({product}: Props) => {
  const {isDark} = useTheme();
  const {addProductToCart} = useContext(ShoppingCartContext)
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);
  const onAddToCart = () => {
    if(product.category === 'shoes') {
        if(!selectedShoeSize) 
        return Notification(isDark).fire({
            icon: 'error',
            title: 'Selecciona una talla'
        })
    }else{
        if(!selectedSize) 
        return Notification(isDark).fire({
            icon: 'error',
            title: 'Selecciona una talla'
        })
    }
    addProductToCart({
        ...product,
        size: selectedSize,
        shoeSize: selectedShoeSize,
        quantity
    })
    Notification(isDark).fire({
        icon: 'success',
        title: 'Producto agregado al carrito'
    })
  }
  return (
    <ShopLayout
        title ='Product page'
        description='This is the produc page'
    >
        <Grid.Container gap={0} justify='flex-start' css={{mt: '$14', mh: 'fit-content'}}>       
            <Grid xs={12} sm={7}> 
                <Image
                    alt='Product image'
                    width= '80%'
                    height = '80%'
                    src={product.image}
                    objectFit = 'fill'
                    css={{borderRadius: '16px'}}
                />
            </Grid>
            <Grid xs={12} sm={4}  direction='column'>
                <Text 
                    size='$lg'
                    weight="bold" 
                    transform="uppercase" 
                    color="#9E9E9E"
                >
                    {product.store.name}
                </Text>
                <Text h1>{product.title}</Text>
                {
                    product.comparativePrice > product.price && (
                        <div 
                            style={{
                                display: 'flex'
                            }}
                        >
                            <Text css={{
                                textDecorationLine: "line-through",
                                fontWeight: "$semibold",
                                fontSize: "$lg",
                                color: "$accents3",
                            }}>
                                ${product.comparativePrice.toFixed(2)}
                            </Text>
                            <Text css={{
                                ml: "$4",
                                color: "$success",
                                fontSize: "$lg",
                                fontWeight: "$semibold",
                            }}>
                                -{((product.comparativePrice-product.price)*100/product.comparativePrice).toFixed(2)}%
                            </Text>
                        </div>
                    )
                }
                <Text css={{
                    fontSize: "$2xl",
                    fontWeight: "$bold",
                }}>
                    ${product.price.toFixed(2)}
                </Text>
                <Spacer y={0.5}/>
                <Button.Group 
                >
                    {
                        product.category === 'shoes' ? (
                            product.shoeSizes!.map((s, index) => 
                            <Button  
                                bordered={selectedShoeSize !== s}
                                key={index} 
                                onPress={() => setSelectedShoeSize(s)} 
                            >
                                {s}
                            </Button>
                        )
                        ) : (
                            product.sizes!.map((s, index) => 
                                <Button 
                                    bordered={selectedSize !== s}
                                    key={index} 
                                    onPress={() => setSelectedSize(s)} 
                                >
                                    {s}
                                </Button>
                            )
                        )
                    }
                </Button.Group>   
                <Spacer y={1} />
                <ItemCounter count={quantity} maxValue={10} onChange={setQuantity}/>
                <Spacer y={1} />
                <Button 
                    shadow
                    css={{width:"100%"}}
                    onPress={() => onAddToCart()}
                >
                    Añadir al carrito
                </Button>
                <Spacer y={2} />
                <Textarea 
                    readOnly
                    initialValue={product.description}
                />
                <Spacer y={1} />
                <User 
                    src={product.store.logo}
                    name={product.store.name}
                />
            </Grid>
        </Grid.Container>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const {id = ''} = ctx.params as {id: string};
    const {data: product} = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    if(!product) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    return {
        props: {
            product
        }
    }   
}

export default ProductPage;