import NextLink from 'next/link';
import { Text, Link, Grid } from '@nextui-org/react';
import { MdRemoveShoppingCart }  from "react-icons/md";

const EmptyPage = () => {
  return (
    <>
        <Grid.Container 
            gap={4}
            alignContent='center'
            alignItems='center'
            justify='center'
            css={{height:'calc(100vh - 200px)'}}
        >
            <Grid>
                <MdRemoveShoppingCart size={100}/>
            </Grid>
            <Grid alignContent='center' alignItems='center' justify='center' >
                <Text h1 >Su carrito está vació</Text>
                <NextLink href='/' passHref>
                    <Link>
                        <Text h2>Regresar</Text>
                    </Link>
                </NextLink>
            </Grid>
        </Grid.Container>
    </>
  )
}

export default EmptyPage