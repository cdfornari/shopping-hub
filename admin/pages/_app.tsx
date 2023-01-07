import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context'
import { darkTheme, lightTheme } from '../themes'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider
        defaultTheme='system'
        attribute='class'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
