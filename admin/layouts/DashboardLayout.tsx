import { FC } from 'react'
import Head from 'next/head'
import { Box, Flex } from '../components/containers';
import { SidebarWrapper } from '../components/sidebar/Sidebar';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const DashboardLayout: FC<Props> = ({children,title,description}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='og:title' content={title}/>
            <meta name='og:description' content={description}/>
        </Head>
        <div
          style={{
            display: 'flex'
          }}
        >
          <SidebarWrapper />
          <Box css={{overflow: 'hidden', height: '100%'}}>
            <Flex
              css={{
                  'gap': '$8',
                  'pt': '$5',
                  'height': 'fit-content',
                  'flexWrap': 'wrap',
                  '@lg': {
                    flexWrap: 'nowrap',
                  },
                  '@sm': {
                    pt: '$10',
                  },
              }}
              justify={'center'}
            ></Flex>
              {children}
          </Box>
        </div>
    </>
  )
}