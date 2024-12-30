import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import { DarkLightThemeProvider } from '@lib/ui/theme/DarkLightThemeProvider'
import { Page } from '@lib/next-ui/Page'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

interface MyAppProps extends AppProps {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <QueryClientProvider client={queryClient}>
      <DarkLightThemeProvider value="dark">
        <GlobalStyle fontFamily={inter.style.fontFamily} />
        {component}
      </DarkLightThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp