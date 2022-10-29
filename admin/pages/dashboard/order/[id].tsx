import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Box } from '../../../components/containers';
import { Button, Card, Grid, Image, Input } from '@nextui-org/react';

const DetailsBrandsPage = (  ) => {
  return (
    <DashboardLayout 
        title='Detalles de la Tienda'
        description='Pagina administrativa de Tienda'
    >
        <h1>Nombre Cliente</h1>

        
        <Grid.Container gap={2} >
            <Grid xs sm>
                <Input
                    labelPlaceholder='Nro. Productos'
                    placeholder="Cantidad Productos.."
                    size="lg"
                    type="text" 
                    fullWidth
                />
            </Grid>
            <Grid xs={12} sm={ 6 }>
                <Input
                    labelPlaceholder='Precio Total'
                    placeholder="$$"
                    size="lg"
                    type="number"
                    fullWidth
                />
            </Grid>
            {/* <Grid xs={12} sm={ 6 }>
                <Input 
                  placeholder="Status"
                  size="lg"
                  type="text"
                  fullWidth
                />
            </Grid> */}

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