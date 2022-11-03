import React from 'react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import axios from 'axios'
import { DashboardLayout } from '../../../layouts'
import { Client } from '../../../models/Client'
import { FC } from 'react';
import { Box } from '../../../components/containers'
import { Card, Input, Link, Spacer, Text } from '@nextui-org/react'

interface Props {
  client: Client
}

export const ClientsProfile: FC<Props> = ({client}) => {
  return (
  <DashboardLayout 
    title='Detalles del Cliente'
    description='Pagina administrativa de Cliente'
  >
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      >
        <Card
          variant='bordered'
          css={{
            width: 'fit-content',
            py: '$15',
            px: '$10',
          }}
          >
            <Card.Header
              css={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Text h1>Detalle de cliente</Text>
            </Card.Header>
            <Card.Body
              css={{
                gap: '$17',
                display: 'flex',
                py: '$12',
              }}
            >
              <Input 
                bordered
                readOnly
                labelPlaceholder="Nombre Completo" 
                initialValue={client.fullName} 
                size='lg'
              />
              <Input 
                bordered
                readOnly
                labelPlaceholder="Email" 
                initialValue={client.user.email}  
                size='lg'
              />
              <Input
                bordered 
                readOnly
                labelPlaceholder="Documento de Identidad" 
                initialValue={client.dni} 
                size='lg'
              />
              <Input 
                bordered
                labelPlaceholder="Número de teléfono"
                readOnly
                initialValue={client.phoneNumber} 
                size='lg'
              />
            </Card.Body>
            <Card.Footer>
              <Box
                css={{
                  gap: '$6',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <NextLink href='/dashboard/clients'>
                  <Link>
                      Volver
                  </Link>
                </NextLink>
              </Box>
              <Spacer x={6} />
            </Card.Footer>
          </Card>
      </Box>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {token} = ctx.req.cookies
    const {id} = ctx.params as {id: string}
    const { data:client } = await axios.get<{client: Client}>(
      `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`,
      {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
    ) 
  
    if (!client) {
      return{
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return{
      props: {
        client,
      }
    }
  }

export default ClientsProfile