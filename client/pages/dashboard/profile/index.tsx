import { Card, Col, Grid, Row, Spacer, Text, Button, User, Input, Link, Container, Avatar } from '@nextui-org/react';
import React, { FC } from 'react'
import { Client } from '../../../models/Client'
import { Box } from '../../../../admin/components/containers/Box';
import NextLink from 'next/link'
import Image from 'next/image';

const img = "https://i.pravatar.cc/400?u=a042581f4e29026024d"
//Usuario de prueba
const myUser: Client = {
  fullName: 'Tony Reichert',
  _id: '2',
  user:{
    _id: '2',
    email: "tony.reichert@example.com",
    isActive: true,
    role: 'CLIENT',
  },
  dni: '222',
  phoneNumber: '0414-22235',
}
//Nombre, email, dni, telefnoo

export const ProfilePage: FC<Client> = ({user}) => {
  return (
    <>
    <Container css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70%', paddingBlock: '30px' }}>
      <Card css={{paddingInline: '25px'}} variant="shadow">
      <Text h3 css={{marginBlock: '25px', alignSelf: 'center'}}>Account profile</Text>
      <Container css={{display: 'flex', justifyContent: 'center'}}>
        <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            css={{ size: "$30" }}
          />
      </Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Input bordered color="primary" label="Name" initialValue={myUser.fullName} fullWidth size='xl'></Input>
        </Grid>
        <Grid xs={12} sm={6}>
          <Input bordered color="primary" label="Email" initialValue={myUser.user.email} fullWidth size='xl'></Input>
        </Grid>
      </Grid.Container>
      <Spacer y={1}></Spacer>
      <hr style={{height: '1px', width: '100%'}}></hr>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6}>
            <Input bordered color="primary" label="DNI" initialValue={myUser.dni} fullWidth size='xl'></Input>
          </Grid>
          <Grid xs={12} sm={6}>
            <Input bordered color="primary" label="Phone number" initialValue={myUser.phoneNumber} fullWidth size='xl'></Input>
          </Grid>
        </Grid.Container>
      <Spacer y={1}></Spacer>
      <hr style={{height: '1px', width: '100%'}}></hr>
      <Button css={{alignSelf: 'center', marginBlock: '20px'}} shadow>Editar</Button>
      <Spacer y={1}></Spacer>
      <Row css={{justifyContent: 'space-between', alignItems: 'center', paddingBlock: '10px'}}>
        <Container>
          <Text h4>Delete account</Text>
          <Text>Quitara todo</Text>
        </Container>
        <Button >Delete</Button>
      </Row>
      <Spacer y={1}></Spacer>
      <hr style={{height: '1px', width: '100%'}}></hr>
      </Card>
    </Container>
  </>
  )
}

export default ProfilePage
