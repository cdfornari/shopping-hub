import { Card, Col, Grid, Row, Spacer, Text } from '@nextui-org/react'
import React, { FC } from 'react'
import { Client } from '../../../models/Client'

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
    <Grid.Container gap={1} justify="flex-start">
        <Grid css={{marginInline: 'auto'}} xs={11} sm={3}>
          <Card isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={img}
                objectFit="cover"
                width="100%"
                height={300}
              />
            </Card.Body>
            <Card.Footer css={{ }}>
            <Col>
            <Row wrap="wrap" justify="space-between" align="center">
                <Text b>Name</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "1.2 rem" }}>
                  {myUser.fullName}
                </Text>
              </Row>
              <Spacer y={1}></Spacer>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>Email</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "1.2 rem" }}>
                  {myUser.user.email}
                </Text>
              </Row>
              <Spacer y={1}></Spacer>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>DNI</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "1.2 rem" }}>
                  {myUser.dni}
                </Text>
              </Row>
              <Spacer y={1}></Spacer>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>Phone number</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "1.2 rem" }}>
                  {myUser.phoneNumber}
                </Text>
              </Row>
            </Col>
            </Card.Footer>
          </Card>
        </Grid>
    </Grid.Container>
  )
}

export default ProfilePage
