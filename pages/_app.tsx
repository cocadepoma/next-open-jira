import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { darkTheme, lightTheme } from '../themes'

import { UIProvider } from '../context/ui'
import { BoardsProvider } from '../context/boards'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <UIProvider>
        <BoardsProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline >
          </ThemeProvider >
        </BoardsProvider>
      </UIProvider>
    </SnackbarProvider>
  )
}

export default MyApp
