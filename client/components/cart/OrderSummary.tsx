import { FC } from 'react';
import { Grid, Loading, Text } from '@nextui-org/react';


interface Props {
    total?: number;
    numberOfItems: number;
}

export const OrderSummary: FC<Props> = ({ total, numberOfItems }) => {
    
  return (
    
    <Grid.Container>
        
        <Grid xs={6}>
            <Text>Nro. Productos</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            <Text>{numberOfItems}</Text>
        </Grid>

        <Grid xs={6} >
            <Text h5 >Total:</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            {
                total ? <Text>${total}</Text> : <Loading/>
            }
        </Grid>

    </Grid.Container>
  )
}