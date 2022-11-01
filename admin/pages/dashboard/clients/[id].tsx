import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import ClientProfile from '../../../components/profiles/ClientProfile'
import { DashboardLayout } from '../../../layouts'
import { Client } from '../../../models/Client'
import { FC } from 'react';
import { Box } from '../../../components/containers'

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
            <ClientProfile user={client} title={'Perfil'} singleUser={false}>
            </ClientProfile>
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