import { Button, Container, Grid, Input, Spacer, Row, Col,  Text, Textarea } from "@nextui-org/react";
import { NextPage } from "next"
import { useState, useRef } from "react";
import { Flex } from "../../components/containers";
import { DropdownInfo } from "../../components/ui/DropdownInfo";
import { DashboardLayout } from "../../layouts";

interface ISizePrice{
    [s : string] : number 
}

const categories = ['Camisas','Pantalones','Zapatos','Accesorio','Ropa interior','Pijamas'];
const gen = ['Hombre', 'Mujer', 'Niño', 'Unisex'];
const sizes = ['XS','S','M','L','XL','XXL','XXXL','UNI']; 
const sizePrice = {
    'XS': 0, 
    'S': 0,
    'M': 0,
    'L': 0,
    'XL': 0,
    'XXL': 0,
    'XXXL': 0,
    'UNI': 0,
    'Talla': 0,
} 
const CreateProductPage: NextPage = () => {
    const [categorieSelected, setCategorieSelected] = useState<string>('Categorias')
    const [genSelected, setGenSelected] = useState<string>('Género')
    const [sizeSelected, setSizeSelected] = useState<string>('Talla')
    const [sizePriceSelected, setSizePriceSelected] = useState<ISizePrice>(sizePrice)
    const [file,setFile] = useState<File>();
    
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onSelectCategorie = (cat: any) => {
        setCategorieSelected(cat);
    }

    const onSelectGen = (gen: any) => {
           setGenSelected(gen);
    }

    const onSelectSize = (size: any) => {
        setSizeSelected(size);
    } 
    const onChangeStockSize = (e: any) =>  {
        console.log(e);
    }

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
                justify='center'
                direction='column'
            >
                <h1>Crear Producto</h1>
            </Flex>
            <Container gap={4} justify="center" direction="column" css={{width:'80%'}}>
                <Spacer y={2}/>
                <Row css={{width:'100%'}}>
                    <Input
                        underlined
                        labelPlaceholder="Titulo"
                        color="secondary"
                        css={{width:'100%'}}
                    />
                </Row>
                <Spacer y={1}/>
                <Row css={{width:'100%'}}>
                    <Col>
                        <DropdownInfo 
                            aria_label="size" 
                            options={gen} 
                            selected={genSelected} 
                            onSelect={onSelectGen}/>
                    </Col>
                    <Spacer x={2}/>
                    <Col>
                        <DropdownInfo 
                                aria_label="categories" 
                                options={categories} 
                                selected={categorieSelected} 
                                onSelect={onSelectCategorie}/>
                    </Col>
                </Row>
                <Spacer y={1}/>
                <Row>
                    <Col css={{width: '100%'}}>    
                        <DropdownInfo 
                            aria_label="size" 
                            options={sizes} 
                            selected={sizeSelected} 
                            onSelect={onSelectSize}/>
                        <Spacer y={5 }/>

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
                            Sube una foto del
                        </Button>
                    </Col>  
                    <Col css={{width: '100%', marginRight:'16px',  marginLeft:'16px'}}>
                        <Row>
                            {   
                                (sizeSelected !== 'Talla') && 
                                <>
                                    <Text h3 css={{marginRight:'4px'}}>Cantidad</Text>
                                    <Input 
                                    labelLeft={sizeSelected}
                                    value= {sizePriceSelected[sizeSelected]}
                                    min="0"
                                    onChange={onChangeStockSize}
                                    type="number"
                                    color="secondary"
                                    animated={false}
                                    css={{width: '100%'}}
                                    /> 
                                </>
                            }
                        </Row>
                        <Spacer y={1}/>

                        <Row>
                            <Text h3 css={{marginRight:'4px'}}>Precio</Text>
                            <Input 
                            labelRight="$"
                            value="0.00" 
                            type="number"
                            color="secondary"
                            animated={false}
                            min="0"
                            step="0.1"
                            css={{width: '100%'}}
                            /> 
                        </Row>
                        <Spacer y={1}/>
                        <Row>
                            <Text h6 css={{marginRight:'4px'}}>Precio Comparativo</Text>
                            <Input 
                            labelRight="$"
                            value="0.00" 
                            type="number"
                            color="secondary"
                            animated={false}
                            min="0"
                            step="0.1"
                            css={{width: '100%'}}
                            /> 
                        </Row>
                    </Col>
                </Row>
                <Spacer y={1}/>
                <Row>
                    <Textarea labelPlaceholder="Descripción" status="default"  css={{width: '100%'}}/>
                </Row>
                <Spacer y={1}/>

                <Row>
                    <Button flat color={'success' }>
                            Crear Producto
                    </Button>
                </Row>
            </Container>       
        </DashboardLayout>
    )
}


export default CreateProductPage;