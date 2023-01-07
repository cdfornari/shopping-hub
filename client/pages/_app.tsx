import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { darkTheme, lightTheme } from '../themes'
import { AuthProvider, ShoppingCartProvider } from '../context'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
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
      </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App
