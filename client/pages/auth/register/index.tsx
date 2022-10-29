import { Button, Grid, Input, Link, Spacer, Text } from '@nextui-org/react';
import NextLink from 'next/link'
import React from 'react'
import { Box } from '../../../../admin/components/containers/Box';

export const RegisterPage = () => {
  
    return (
    <Box css={{ width: 450, padding:'10px 20px', marginInline: 'auto' }}>
        <Grid.Container gap={4.5}>
            <Grid  xs={12}>
                <Text
                    h1
                    size={55}
                    css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                >
                Crear cuenta
                </Text>
            </Grid>
            <Grid  xs={12}>
                <Input size={'xl'} clearable labelPlaceholder="Name" width='100%'/>
            </Grid>
            <Grid  xs={12}>
                <Input  size={'xl'} clearable labelPlaceholder="Email" width='100%'/>
            </Grid>
             <Grid  xs={12}>
                <Input size={'xl'} clearable labelPlaceholder="DNI" width='100%'/>
            </Grid>
            <Grid  xs={12}>
                <Input size={'xl'} clearable labelPlaceholder="Phone Number" width='100%'/>
            </Grid>
            <Grid  xs={12}>
                <Input.Password size={'xl'} clearable labelPlaceholder="Password" width='100%'/>
             </Grid>
            <Grid  xs={12}>
                 <Button size="lg" shadow color="primary" css={{width: '100%'}}>Ingresar</Button>
            </Grid>      

            <Grid xs={12} css={{display:'flex', justifyContent: 'end'}}>
                <NextLink href="/auth/login" passHref>
                    <Link underline='true'>
                         ¿Ya tienes una cuenta?
                    </Link>
                </NextLink>
            </Grid>
        </Grid.Container>
    </Box>
  )
}

export default RegisterPage