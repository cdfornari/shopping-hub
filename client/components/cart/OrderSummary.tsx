import { FC, useContext } from 'react';
// import { CartContext } from '../../context/cart/CartContext';
// import { currency } from '../../utils';
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
    
    //const { numberOfItems, subTotal, total, tax } = useContext( CartContext );
    
    //const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };
  
    

  return (
    
    <Grid.Container>
        
        <Grid xs={6}>
            <Text>Nro. Productos</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            {/* <Text>{summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'productos': 'producto' }</Text> */}
            <Text>10</Text>
        </Grid>

        <Grid xs={6}>
            <Text>SubTotal</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            {/* <Text>{ currency.format(summaryValues.subTotal) }</Text> */}
            <Text>$50</Text>
        </Grid>

        <Grid xs={6}>
            <Text>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            {/* <Text>{ currency.format(summaryValues.tax) }</Text> */}
            <Text>$3</Text>
        </Grid>

        <Grid xs={6} >
            <Text h5 >Total:</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
            {/* <Text h5>{ currency.format(summaryValues.total) }</Text> */}
            <Text>$53</Text>
        </Grid>

    </Grid.Container>
  )
}