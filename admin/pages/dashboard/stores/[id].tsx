import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { Button, Card, Grid, Image, Input } from '@nextui-org/react';

const DetailsBrandsPage = (  ) => {
  return (
    <DashboardLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <h1>Nombre Marca/Tienda/Store</h1>

        
        <Grid.Container gap={2} >
            <Grid alignContent='space-between'   alignItems='center' direction='column'>
              <Image
                
                css={{border: "$background"}}
                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                alt="Default Image"
                width={"50%"}
                height={"100%"}

              />
            </Grid>

            <Grid xs sm>
                <Input
                    labelPlaceholder='RIF'
                    placeholder="RIF-Tienda"
                    size="lg"
                    type="text" 
                    fullWidth
                />
            </Grid>
            <Grid xs={12} sm={ 6 }>
                <Input
                    labelPlaceholder='Telefono'
                    placeholder="Next UI"
                    size="lg"
                    type="tel"
                    fullWidth
                />
            </Grid>
            <Grid xs={12} sm={ 6 }>
                <Input 
                  placeholder="Status"
                  size="lg"
                  type="text"
                  fullWidth
                />
            </Grid>

            {/* <Grid xs={12} sm={ 6 }>
                <Input 
                  placeholder="Next UI"
                  size="lg"
                  type="text"
                  fullWidth
                />
            </Grid>
            <Grid xs={12} sm={ 6 }>
                <Input
                  placeholder="Next UI"
                  size="lg"
                  fullWidth
                />
            </Grid>
            
            <Grid xs={12} sm={ 6 }>
                <Input                        
                  placeholder="Next UI"
                  size="lg"
                  type="text"
                  fullWidth
                />

            </Grid>
            <Grid xs={12} sm={ 6 }>
                <Input
                  placeholder="Next UI"   
                  size="lg" 
                  type="text"
                  readOnly
                  fullWidth
                />
            </Grid> */}

        </Grid.Container>
        <Box>
            <Button type="submit" color="secondary" className="circular-btn">
                Revisar pedido
            </Button>
        </Box>
        
    </DashboardLayout>
  )
}

export default DetailsBrandsPage