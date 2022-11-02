import { Button, Card, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import React from 'react'
import { AuthLayout } from '../../layouts'
import { Box } from '../containers';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { FC } from 'react';
import NextLink from 'next/link'
import { Client } from '../../../client/models/Client';

interface Props {
    children: React.ReactNode,
    user: Client | undefined,
    title: string,
    singleUser?: boolean,
}

export const ClientProfile: FC<Props> = ({user,title='Mi perfil', singleUser=true}) => {

    return (
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
              <Text h1>{title}</Text>
            </Card.Header>
            <Card.Body
              css={{
                gap: '$17',
                display: 'flex',
                py: '$12',
              }}
            >
              {
                user ? (
                  <>
                    <Input 
                      bordered
                      readOnly
                      labelPlaceholder="Nombre Completo" 
                      initialValue={user?.fullName} 
                      size='lg'
                    />
                    <Input 
                      bordered
                      readOnly
                      labelPlaceholder="Email" 
                      initialValue={user?.user?.email}  
                      size='lg'
                    />
                    <Input 
                      bordered 
                      readOnly
                      labelPlaceholder="Documento de Identidad" 
                      initialValue={user?.dni} 
                      size='lg'
                    />
                    <Input 
                      bordered
                      labelPlaceholder="Número de teléfono"
                      readOnly
                      initialValue={user?.phoneNumber} 
                      size='lg'
                    />
                  </>
                ) : (
                  <Loading/>
                )
              }
            </Card.Body>
            <Card.Footer>
              <Box
                css={{
                  gap: '$6',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {  
                    singleUser  
                    ?   <>
                            <Button
                            light
                            >
                            Mis Órdenes
                            </Button>
                        </> 
                    : <></>
                }
                <Button
                    light
                    color='error'
                >
                  <NextLink href={singleUser ? '/' : '/dashboard/clients'}>
                        <Link>
                            Volver
                        </Link>
                  </NextLink>
                </Button>
              </Box>
              <Spacer x={6} />
              <ThemeSwitcher/>
            </Card.Footer>
          </Card>
      )
}

export default ClientProfile