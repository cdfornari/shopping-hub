import { useRouter } from "next/router"
import type { NextPage } from "next";
import { ShopLayout } from "../../layouts";
import { Button, Grid, Image, Input, Spacer, Textarea, User } from "@nextui-org/react";
import { useState } from "react";
import { ItemCounter } from "../../components/ui/ItemCounter";


const sizes = ['XS','S','M','L','XL','XXL','XXXL','UNI']; 

const ProductPage: NextPage = () => {
    
    const [sizeSelected, setSizeSelected] = useState<string>('');
    const [countStock, setCountStock] = useState<number>(1);
    const router = useRouter();


    const {slug} = router.query;
    
    const onSelectSize = ({target: {textContent}}: any) => {
        setSizeSelected(textContent);
    }
    
    const onIncrementStock = (value: number) => {
        setCountStock(value);

    }

    const onAddToCart = () => {
        console.log('Se añade al carrito');
    }




  return (
    <ShopLayout
    title ='Product page'
    description='This is the produc page'
    >

        <Grid.Container gap={0} justify='flex-start'>
            
            <Grid xs={12} sm={7}> 
                <Image
                    width= '80%'
                    height = '80%'
                    src='https://m.media-amazon.com/images/I/51hVzgFXqOL._AC_UX466_.jpg'
                    alt={`${slug} produc image`}
                    objectFit = 'fill'
                    css={{borderRadius: '16px'}}
                />
            </Grid>
            
            <Grid xs={12} sm={4}  direction='column'>
            
                <small>Categoría</small>
                <h3 style={{margin: '0px'}}>Nombre del producto</h3>
                <b>$30.00</b>
                <p><b>{sizeSelected}</b></p>

                <Button.Group ghost color="secondary">
                {
                    sizes.map((s, index) => <Button key={index} onPress={onSelectSize} css={{width:"100%"}}>
                            {s}
                        </Button>)
                }
                </Button.Group>
                <Spacer y={1} />
                
                <ItemCounter count={countStock} maxValue={999} onChange={onIncrementStock}/>
                
                {/* <Input type="number" placeholder="Cantidad" color="secondary"  animated={false}/> */}
                <Spacer y={1} />

                <Button 
                    shadow color="secondary" 
                    css={{width:"100%"}}
                    onPress={onAddToCart}>
                    Añadir al carrito
                </Button>
                <Spacer y={2} />

                <Textarea 
                    readOnly
                    initialValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget augue id metus tempus tincidunt. Nunc tincidunt maximus leo"
                />
                <Spacer y={1} />
                
                <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Tienda"/>

            </Grid>


        </Grid.Container>
    </ShopLayout>
  )
}
export default ProductPage;