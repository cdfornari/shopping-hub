import { FC, useContext } from 'react';
import { Grid, Text } from '@nextui-org/react';


interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
    
  return (
    
    <Grid.Container>
        
        <Grid xs={6}>
            <Text>Nro. Productos</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            <Text>10</Text>
        </Grid>

        <Grid xs={6}>
            <Text>SubTotal</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            <Text>$50</Text>
        </Grid>

        <Grid xs={6}>
            <Text>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            <Text>$3</Text>
        </Grid>

        <Grid xs={6} >
            <Text h5 >Total:</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            <Text>$53</Text>
        </Grid>

    </Grid.Container>
  )
}