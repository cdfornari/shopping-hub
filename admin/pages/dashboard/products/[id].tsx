import { useState, useRef } from 'react';
import { NextPage } from "next"
import { Button, Container, Input, Spacer, Row, Col, Text, Image,Textarea, Radio, Checkbox, useTheme, Loading } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { DashboardLayout } from '../../../layouts';
import { Flex } from '../../../components/containers';
import { Size, ValidSizes, shoeSizes } from '../../../types/size';
import { Gender, ValidGenders } from '../../../types/gender';
import { Category, ValidCategories } from '../../../types/category';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { api } from '../../../api/api';
import {Product} from '../../../models/product'
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetServerSideProps } from 'next'
import { genderReducer, categoryReducer } from '../../../helpers';

interface Props {
    product: Product;
}


const DetailsProductPage: NextPage<Props> = ( {product}) => {
    const router = useRouter();
    const {isDark} = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [selectedGender, setSelectedGender] = useState<Gender>()
    const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
    const [selectedShoeSizes, setSelectedShoeSizes] = useState<number[]>([])
    const [price, setPrice] = useState<number>(0)
    const [compPrice, setCompPrice] = useState<number>(0)
    const [file,setFile] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading,setIsLoading] = useState(false)
    const onSubmit = async () => {
        if(compPrice < price)
        return Notification(isDark).fire({
            icon: 'error',
            title: 'Error',
            text: 'El precio comparativo no puede ser menor al precio'
        });
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',

        })
        if(selectedCategory === 'shoes'){
            if(selectedShoeSizes.length === 0) 
            return Notification(isDark).fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar al menos una talla de zapato'
            });
        }else{
            if(selectedSizes.length === 0) 
            return Notification(isDark).fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar al menos una talla'
            });
        }
        try {
            const formData = new FormData();
            formData.append('image', file!);
            const {data} = await api.post<string>('/uploads',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            await api.post('/products/create',
                {
                    title: title.value,
                    description: description.value,
                    price: price,
                    comparativePrice: compPrice,
                    category: selectedCategory,
                    gender: selectedGender, 
                    image: data,
                    sizes: selectedSizes,
                    shoeSizes: selectedShoeSizes
                },
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            )
            Notification(isDark).fire({
                title: 'Producto creado',
                icon: 'success',
                
            })
            setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.response.data.message,
                icon: 'error',
                timer: 3000
            })
            setIsLoading(false)
        }
    }
    const {allowSubmit,parsedFields} = useForm([
        {
            name: 'title',
            validate: (value: string) => value.length >= 3,
            validMessage: '',
            errorMessage: 'Minimo 3 caracteres',
            initialValue: '',
        },
        {
            name: 'description',
            validate: (value: string) => value.length >= 10,
            validMessage: '',
            errorMessage: 'Minimo 10 caracteres',
            initialValue: '',
        },
    ])
    const [title,description] = parsedFields;
    if (!product) return (
        <DashboardLayout
            title="Details Product"
            description="A Create product page"
            
        >   
            <Loading type='points'/>
        </DashboardLayout>)
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
                    Detalle producto
                </Text>
                {/* <Button
                    disabled={!allowSubmit || !file || !selectedGender || !selectedCategory || isLoading}
                    onPress={onSubmit}
                >
                    {!isLoading ? 'Crear Producto' : <Loading type='points'/>}
                </Button> */}
            </Flex>
            <Container gap={4} justify="center" direction="column" css={{width:'80%'}}>
                <Spacer y={2}/>
                <Row css={{width:'100%'}}>
                    <Input
                        bordered
                        labelPlaceholder="Título"
                        css={{width:'100%'}}
                        value={product.title}
                        onChange={(e) => title.setValue(e.target.value)}
                        helperText={title.message}
                        helperColor={title.color}
                        status={title.color}
                        color={title.color}
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
                        onChange={(e) => description.setValue(e.target.value)}
                        helperText={description.message}
                        helperColor={description.color}
                        color={description.color}
                        readOnly
                    />
                </Row>
                <Spacer y={1}/>
                <Row css={{width:'100%'}}>
                    <Col>
                        <Radio.Group
                            label="Género"
                            value={product.gender}
                            onChange={(value) => setSelectedGender(value as Gender)}
                            isReadOnly
                        >
                            {
                                ValidGenders.map((gender) => (
                                    <Radio value={gender}>
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
                            onChange={(value) => setSelectedCategory(value as Category)}
                            isReadOnly
                        >
                            {
                                ValidCategories.map((category) => (
                                    <Radio value={category}>
                                        {categoryReducer(category)}
                                    </Radio>
                                ))
                            }
                        </Radio.Group>
                    </Col>
                    <Col>
                        {
                            product.category &&  (
                                selectedCategory === 'shoes' ? (
                                    <Checkbox.Group
                                        value={product.shoeSizes?.map((size) => size.toString())}
                                        onChange={(value) => setSelectedShoeSizes(value.map((v) => parseInt(v)))}
                                        label="Tallas"
                                        isReadOnly

                                    >
                                        {
                                            shoeSizes.map((size) => (
                                                <Checkbox
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
                                        onChange={(value) => setSelectedSizes(value as Size[])}
                                        label="Tallas"
                                        isReadOnly
                                    >
                                        {
                                            ValidSizes.map((size) => (
                                                <Checkbox
                                                    size='xs'
                                                    value={size}
                                                >
                                                    {size}
                                                </Checkbox>
                                            ))
                                        }
                                    </Checkbox.Group>
                                )
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
                        {/* <Row>
                            <input
                                type='file'
                                ref={fileInputRef}
                                onChange={e => setFile(e.target.files?.[0])}
                                accept='image/*'
                                style={{
                                    display: 'none'
                                }}
                            />
                            <Button
                                flat
                                css={{mt: '-$5', width: '100%' }}
                                onPress={() => fileInputRef.current?.click()}
                                color={file ? 'success' : 'primary'}
                                disabled
                            >
                                Sube una foto
                            </Button>
                        </Row> */}
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
                                onChange={(e) => setPrice(Number(e.target.value))}
                                status={'success'}
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
                                onChange={(e) => setCompPrice(Number(e.target.value))}
                                status={'success'}
                                color={compPrice > 0 && compPrice > price ? 'success' : 'error'}
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