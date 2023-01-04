import { useContext, useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Button, Container, Grid, Image, Pagination, Spacer, Text, Textarea, User, useTheme } from '@nextui-org/react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { ShopLayout } from "../../layouts";
import { ItemCounter } from "../../components/ui/ItemCounter";
import { Product, Size } from '../../models';
import { ShoppingCartContext } from '../../context/shopping-cart';
import { Notification } from '../../notification';
import { sortSizes } from '../../helpers';
import { ReviewCard } from '../../components/reviews/ReviewCard';

interface Props {
    product: Product;
}

const ProductPage: NextPage<Props> = ({product}: Props) => {
  const {isDark} = useTheme();
  const {addProductToCart} = useContext(ShoppingCartContext)
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);
  const [pagination, setPagination] = useState(1)
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
            <Grid xs={12} sm={7} css={{h: 'fit-content'}}> 
                <Image
                    alt='Product image'
                    width='80%'
                    src={product.image}
                    objectFit = 'fill'
                    css={{borderRadius: '16px'}}
                />
            </Grid>
            <Grid xs={12} sm={4} direction='column'>
                <Text 
                    size='$lg'
                    weight="bold" 
                    transform="uppercase" 
                    color="#9E9E9E"
                >
                    {product.store.name}
                </Text>
                <Text h1>{product.title}</Text>
                <div style={{display: 'flex'}}>
                    <Rating
                        size={20}
                        readonly
                        allowFraction
                        fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                        initialValue={
                            product.reviews.length === 0 ? 0 :
                            product.reviews.reduce((acc, review) => acc + review.rating,0)/product.reviews.length
                        }
                    />
                    {
                        product.reviews.length > 0 && (
                            <Text css={{mt: '-$2'}} size='lg'>
                                {
                                (product.reviews.reduce((acc, review) => acc + review.rating,0)/product.reviews.length).toFixed(2)}/5.00
                            </Text>
                        )
                    }
                    <Spacer x={0.5}/>
                    <Text css={{mt: '-$2'}} size='lg'>
                        ({product.reviews.length})
                    </Text>
                </div>
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
                                color: "$accents6",
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
                            product.shoeSizes!.sort().map((s, index) => 
                            <Button  
                                bordered={selectedShoeSize !== s}
                                key={index} 
                                onPress={() => setSelectedShoeSize(s)} 
                            >
                                {s}
                            </Button>
                        )
                        ) : (
                            sortSizes(product.sizes!).map((s, index) => 
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
                <Spacer y={1} />
                <Text h3>Reseñas</Text>
                {
                    product.reviews.length === 0 ? (
                        <Text css={{mt: '$2'}}>Nadie ha escrito reseñas todavía</Text>
                    ) : (
                        <ReviewCard
                            review={product.reviews[pagination-1]}
                        />
                    )
                }
                {
                    product.reviews.length > 1 && (
                        <Container css={{d: 'flex', justifyContent: 'center', mt: '$8'}}>
                            <Pagination
                                loop
                                page={pagination}
                                onChange={setPagination}
                                total={product.reviews.length}
                            />  
                        </Container>
                    )
                }
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