import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme, lightTheme } from '../themes'

import '../styles/globals.css'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <EntriesProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline >
        </ThemeProvider >
      </EntriesProvider>
    </UIProvider>
  )
}

export default MyApp
