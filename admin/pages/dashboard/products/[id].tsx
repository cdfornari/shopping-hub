import { NextPage,GetServerSideProps } from "next"
import { Container, Input, Spacer, Row, Col, Text, Image,Textarea, Radio, Checkbox, useTheme, Loading, Link } from '@nextui-org/react';
import axios from 'axios';
import { DashboardLayout } from '../../../layouts';
import { Flex } from '../../../components/containers';
import { ValidSizes, shoeSizes } from '../../../types/size';
import { ValidGenders } from '../../../types/gender';
import { ValidCategories } from '../../../types/category';
import {Product} from '../../../models/product'
import NextLink from 'next/link';
import { genderReducer, categoryReducer } from '../../../helpers';

interface Props {
    product: Product;
}

const DetailsProductPage: NextPage<Props> = ({product}) => {
    return (
        <DashboardLayout
            title="Details Product"
            description="A Create product page"
        >
            <Flex
                css={{
                    'mt': '$5',
                    'px': '$6',
                    '@sm': {
                        mt: '$10',
                        px: '$16',
                    },
                }}
                justify='between'
                align='center'
            >
                <Text h1>
                    Detalle del producto
                </Text>
                <NextLink href='/dashboard/products'>
                    <Link>
                        Volver
                    </Link>
                </NextLink>
            </Flex>
            <Container gap={4} justify="center" direction="column" css={{width:'80%'}}>
                <Spacer y={2}/>
                <Row css={{width:'100%'}}>
                    <Input
                        bordered
                        labelPlaceholder="Título"
                        css={{width:'100%'}}
                        value={product.title}
                        readOnly
                    />
                </Row>
                <Spacer y={2.5}/>
                <Row>
                    <Textarea 
                        labelPlaceholder="Descripción" 
                        status="default"  
                        css={{width: '100%'}}
                        value={product.description}
                        readOnly
                    />
                </Row>
                <Spacer y={1}/>
                <Row css={{width:'100%'}}>
                    <Col>
                        <Radio.Group
                            label="Género"
                            value={product.gender}
                            isReadOnly
                        >
                            {
                                ValidGenders.map((gender) => (
                                    <Radio value={gender} key={gender}>
                                        {genderReducer(gender)}
                                    </Radio>
                                ))
                            }
                        </Radio.Group>
                    </Col>
                    <Spacer x={2}/>
                    <Col>
                        <Radio.Group
                            label="Categoría"
                            value={product.category}
                            isReadOnly
                        >
                            {
                                ValidCategories.map((category) => (
                                    <Radio value={category} key={category}>
                                        {categoryReducer(category)}
                                    </Radio>
                                ))
                            }
                        </Radio.Group>
                    </Col>
                    <Col>
                        {
                            product.category === 'shoes' ? (
                                <Checkbox.Group
                                    value={product.shoeSizes?.map((size) => size.toString())}
                                    label="Tallas"
                                    isReadOnly

                                >
                                    {
                                        shoeSizes.map((size) => (
                                            <Checkbox
                                                key={size}
                                                size='xs'
                                                value={size.toString()}
                                            >
                                                {size}
                                            </Checkbox>
                                        ))
                                    }
                                </Checkbox.Group>
                            ) : (
                                <Checkbox.Group
                                    value={product.sizes?.map((size) => size)}
                                    label="Tallas"
                                    isReadOnly
                                >
                                    {
                                        ValidSizes.map((size) => (
                                            <Checkbox
                                                key={size}
                                                size='xs'
                                                value={size}
                                            >
                                                {size}
                                            </Checkbox>
                                        ))
                                    }
                                </Checkbox.Group>
                            )
                        }   
                    </Col>
                    <Col>
                        <Image
                            width='100%'
                            height='100%'  
                            src={product.image}
                            alt="Default Image"
                            css={{borderRadius: '16px'}}
                            />
                    </Col>
                </Row>
                <Spacer y={2}/>
                <Row>
                    <Col css={{width: '100%'}}>
                        <Spacer y={2}/>
                        <Row>
                            <Input 
                                labelLeft="$"
                                label='Precio'
                                type="number"
                                animated={false}
                                min="0"
                                step="0.1"
                                value={product.price}
                                readOnly
                            /> 
                            <Spacer x={2}/>
                            <Input 
                                labelLeft="$"
                                label='Precio Comparativo'
                                type="number"
                                animated={false}
                                min="0"
                                step="0.1"
                                value={product.comparativePrice}
                                readOnly
                            /> 
                        </Row>
                    </Col>
                </Row>
                <Spacer y={2}/>
            </Container>       
        </DashboardLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.req.cookies;
    const { id = '' } = ctx.params as {id: string}; 
    const {data: product} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        headers: { 
          Cookie: `token=${token};`, 
          Authorization: `Bearer ${token}`
        },
      }
    );
    
    if (!product) {
      return{
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
  
    return {
      props: {
        product,
      }
    }
  }


export default DetailsProductPage;