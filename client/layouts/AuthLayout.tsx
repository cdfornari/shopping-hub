import { FC } from 'react'
import Head from 'next/head'

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
        <main>
            {children}
        </main>
    </>
  )
}