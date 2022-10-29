import { FC } from 'react'
import Head from 'next/head'
import { Box } from '../components/containers';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({children,title,description}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
        </Head>
        <Box 
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            gap: '10px',
          }}
        >
          {children}
        </Box>
    </>
  )
}