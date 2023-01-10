import { useState, useRef } from 'react';
import { NextPage } from "next"
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Container, Input, Spacer, Row, Col, Text, Textarea, Radio, Checkbox, useTheme, Loading, Link } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { DashboardLayout } from '../../../layouts';
import { Box, Flex } from '../../../components/containers';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { api } from '../../../api/api';
import { genderReducer, categoryReducer } from '../../../helpers';
import { Category, Gender, shoeSizes, Size, ValidCategories, ValidGenders, ValidSizes } from '../../../models/product';

const CreateProductPage: NextPage = () => {
    const {isDark} = useTheme();
    const { replace } = useRouter();
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
            setTimeout(() => replace('/dashboard/products'),500)
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
    return (
        <DashboardLayout
            title="Create Product"
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
                <Box
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '$2',
                    }}
                >
                    <Text h1>
                        Crear producto
                    </Text>
                    <NextLink href='/dashboard/products'>
                        <Link>
                            Volver
                        </Link>
                    </NextLink>
                </Box>
                <Button
                    disabled={!allowSubmit || !file || !selectedGender || !selectedCategory || isLoading}
                    onPress={onSubmit}
                    size='lg'
                >
                    {!isLoading ? 'Crear Producto' : <Loading type='points'/>}
                </Button>
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
                    />
                </Row>
                <Spacer y={1}/>
                <Row css={{width:'100%'}}>
                    <Col>
                        <Radio.Group
                            label="Género"
                            value={selectedGender}
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
                            selectedCategory &&  (
                                selectedCategory === 'shoes' ? (
                                    <Checkbox.Group
                                        value={selectedShoeSizes.map((size) => size.toString())}
                                        onChange={(value) => setSelectedShoeSizes(value.map((v) => parseInt(v)))}
                                        label="Tallas"
                                    >
                                        {
                                            shoeSizes.map((size) => (
                                                <Checkbox
                                                    size='xs'
                                                    value={size.toString()}
                                                    key={size}
                                                >
                                                    {size}
                                                </Checkbox>
                                            ))
                                        }
                                    </Checkbox.Group>
                                ) : (
                                    <Checkbox.Group
                                        value={selectedSizes.map((size) => size)}
                                        onChange={(value) => setSelectedSizes(value as Size[])}
                                        label="Tallas"
                                    >
                                        {
                                            ValidSizes.map((size) => (
                                                <Checkbox
                                                    size='xs'
                                                    value={size}
                                                    key={size}
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
                </Row>
                <Spacer y={2}/>
                <Row>
                    <Col css={{width: '100%'}}>
                        <Row>
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
                            >
                                Sube una foto
                            </Button>
                        </Row>
                        <Spacer y={2}/>
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
                            /> 
                        </Row>
                    </Col>
                </Row>
                <Spacer y={2}/>
            </Container>       
        </DashboardLayout>
    )
}


export default CreateProductPage;