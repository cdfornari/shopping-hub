import { Badge, Card, Grid, Input, Spacer, Text } from '@nextui-org/react'
import React, { FC } from 'react'
import { Store } from '../../models/Store'

interface Props {
  store: Store,
}

export const StoreProfile: FC<Props> = ({store}) => {
  return (
    <>
      <Text h1> { "Detalles de Tienda" } </Text>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='space-between'   alignItems='center' xs={ 12 } sm={ 7 }>
          <Card isHoverable>
            <Card.Divider />
            <Card.Image 
              src={store.logo}
              objectFit="cover"
              width="absolute"
              height={340}
              alt="Card image background"
            />
          </Card> 
        </Grid>

        <Grid xs={12} sm={ 5 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            value={store.name}
            fullWidth
            bordered
            readOnly
          />
          <Spacer y={2} />
          <Input
            labelPlaceholder='RIF'
            value={store.rif}
            fullWidth
            bordered
            readOnly
          />
          <Spacer y={2} />

          <Input
            labelPlaceholder='Telefono'
            value={store.phoneNumber}
            fullWidth
            bordered
            readOnly
          />
          <Spacer y={2} />

          <Input
            labelPlaceholder='Correo'
            value={store.user.email}
            fullWidth
            bordered
            type={"email"}
            readOnly
          />
          <Spacer y={2} />

          <Badge 
            color={store.user.isActive ? 'success' : 'error'}
            variant='bordered'
            css={{width: "100%", height: "100%"}}
          >
            {store.user.isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default StoreProfile
