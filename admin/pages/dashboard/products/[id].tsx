import { useContext, useMemo, useRef, useState } from 'react';
import { NextPage,GetServerSideProps } from "next"
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Container, Input, Spacer, Row, Col, Text, Image,Textarea, Radio, Checkbox, useTheme, Loading, Link, Button } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DashboardLayout } from '../../../layouts';
import { Flex } from '../../../components/containers';
import { Product } from '../../../models/product'
import { genderReducer, categoryReducer } from '../../../helpers';
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { api } from '../../../api/api';
import { Category, Gender, shoeSizes, Size, ValidCategories, ValidGenders, ValidSizes } from '../../../models/product';

interface Props {
    product: Product;
}

const DetailsProductPage: NextPage<Props> = ({product}) => {
    const {isDark} = useTheme();
    const router = useRouter()
    const {user} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const [file,setFile] = useState<File | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category>(product.category)
    const [selectedGender, setSelectedGender] = useState<Gender>(product.gender)
    const [selectedSizes, setSelectedSizes] = useState<Size[]>(product.sizes || [])
    const [selectedShoeSizes, setSelectedShoeSizes] = useState<number[]>(product.shoeSizes || [])
    const [price, setPrice] = useState<number>(product.price)
    const [compPrice, setCompPrice] = useState<number>(product.comparativePrice)
    const {allowSubmit,parsedFields} = useForm([
        {
            name: 'title',
            validate: (value: string) => value.length >= 3,
            validMessage: '',
            errorMessage: 'Minimo 3 caracteres',
            initialValue: product.title,
        },
        {
            name: 'description',
            validate: (value: string) => value.length >= 10,
            validMessage: '',
            errorMessage: 'Minimo 10 caracteres',
            initialValue: product.description,
        },
    ])
    const [title,description] = parsedFields;
    const infoChanged = useMemo(() => {
        return title.value !== product.title ||
        description.value !== product.description ||
        price !== product.price ||
        compPrice !== product.comparativePrice ||
        selectedCategory !== product.category ||
        selectedGender !== product.gender ||
        selectedSizes.sort().join(',') !== product.sizes?.sort().join(',') ||
        selectedShoeSizes.sort().join(',') !== product.shoeSizes?.sort().join(',')
    }, [title.value,description.value,price,compPrice,selectedCategory,selectedGender,selectedSizes,selectedShoeSizes,product])
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
            if(file){
                const formData = new FormData();
                formData.append('image',file);
                await api.patch(`/products/change-image/${product._id}`,formData,{
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                })
                Notification(isDark).fire({
                    title: 'Imagen actualizada',
                    icon: 'success',
                })
                setFile(null)
            }
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.response.data.message,
                icon: 'error',
                timer: 3000
            })
        }
        try {
            if(infoChanged){
                await api.patch(`/products/${product._id}`,
                    {
                        title: title.value !== product.title ? title.value : null,
                        description: description.value !== product.description ? description.value : null,
                        price: price !== product.price ? price : null,
                        comparativePrice: compPrice !== product.comparativePrice ? compPrice : null, 
                        category: selectedCategory !== product.category ? selectedCategory : null,
                        gender: selectedGender !== product.gender ? selectedGender : null, 
                        sizes: selectedCategory !== 'shoes' &&
                        (selectedSizes.sort().join(',') !== product.sizes?.sort().join(',')) ? selectedSizes : null,
                        shoeSizes: selectedCategory === 'shoes' &&
                        (selectedShoeSizes.sort().join(',') !== product.shoeSizes?.sort().join(',')) ? selectedShoeSizes : null,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('token')}`
                        }
                    }
                )
                Notification(isDark).fire({
                    title: 'Producto actualizado',
                    icon: 'success',
                })
            }
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.response.data.message,
                icon: 'error',
                timer: 3000
            })
        }
        setIsLoading(false)
        router.replace(router.asPath)
    }
    return (
        <DashboardLayout
            title="Detalle del producto"
            description="Detalle del producto"
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
                        value={title.value}
                        onChange={(e) => title.setValue(e.target.value)}
                        helperText={title.message}
                        helperColor={title.color}
                        status={title.color}
                        color={title.color}
                        readOnly={user?.role !== 'STORE'}
                    />
                </Row>
                <Spacer y={2.5}/>
                <Row>
                    <Textarea 
                        labelPlaceholder="Descripción" 
                        status="default"  
                        css={{width: '100%'}}
                        value={description.value}
                        onChange={(e) => description.setValue(e.target.value)}
                        helperText={description.message}
                        helperColor={description.color}
                        color={description.color}
                        readOnly={user?.role !== 'STORE'}
                    />
                </Row>
                <Spacer y={1}/>
                <Row css={{width:'100%'}}>
                    <Col>
                        <Radio.Group
                            label="Género"
                            value={selectedGender}
                            isReadOnly={user?.role !== 'STORE'}
                            onChange={(value) => setSelectedGender(value as Gender)}
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
                            value={selectedCategory}
                            isReadOnly={user?.role !== 'STORE'}
                            onChange={(value) => setSelectedCategory(value as Category)}
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
                            selectedCategory === 'shoes' ? (
                                <Checkbox.Group
                                    value={selectedShoeSizes.map((size) => size.toString())}
                                    label="Tallas"
                                    isReadOnly={user?.role !== 'STORE'}
                                    onChange={(value) => setSelectedShoeSizes(value.map((v) => parseInt(v)))}
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
                                    value={selectedSizes.map((size) => size)}
                                    label="Tallas"
                                    isReadOnly={user?.role !== 'STORE'}
                                    onChange={(value) => setSelectedSizes(value as Size[])}
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
                            css={{borderRadius: '16px', mb: '$4'}}
                        />
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
                            css={{width: '100%' }}
                            onPress={() => fileInputRef.current?.click()}
                            color={file ? 'success' : 'primary'}
                        >
                            Cambia la imagen
                        </Button>
                    </Col>
                </Row>
                <Spacer y={1}/>
                <Row>
                    <Col css={{width: '100%'}}>
                        <Row>
                            <Input 
                                labelLeft="$"
                                label='Precio'
                                type="number"
                                animated={false}
                                min="0"
                                step="0.1"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                helperText={
                                    price > 0 ? 
                                    (price > compPrice ? 'El precio debe ser >= al precio comparativo' : '') : 
                                    'El precio debe ser mayor a 0'
                                }
                                helperColor={price > 0 && compPrice >= price ? 'success' : 'error'}
                                status={price > 0 && compPrice >= price ? 'success' : 'error'}
                                color={price > 0 && compPrice >= price ? 'success' : 'error'}
                                readOnly={user?.role !== 'STORE'}
                            /> 
                            <Spacer x={2}/>
                            <Input 
                                labelLeft="$"
                                label='Precio Comparativo'
                                type="number"
                                animated={false}
                                min="0"
                                step="0.1"
                                value={compPrice}
                                onChange={(e) => setCompPrice(Number(e.target.value))}
                                helperText={compPrice > 0 && compPrice >= price ? '' : 'El precio comparativo debe ser > 0 y >= precio'}
                                helperColor={compPrice > 0 && compPrice >= price ? 'success' : 'error'}
                                status={compPrice > 0 && compPrice >= price ? 'success' : 'error'}
                                color={compPrice > 0 && compPrice >= price ? 'success' : 'error'}
                                readOnly={user?.role !== 'STORE'}
                            /> 
                        </Row>
                    </Col>
                </Row>
                <Spacer y={2}/>
                <Button
                    disabled={!allowSubmit || (!infoChanged && !file) || isLoading}
                    onPress={onSubmit}
                    css={{
                        d: user?.role === 'STORE' ? 'block' : 'none',
                    }}
                >
                    {!isLoading ? 'Actualizar' : <Loading type='points'/>}
                </Button>
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