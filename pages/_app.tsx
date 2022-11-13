import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme, lightTheme } from '../themes'

import '../styles/globals.css'
import { UIProvider } from '../context/ui'
import { BoardsProvider } from '../context/boards'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <BoardsProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline >
        </ThemeProvider >
      </BoardsProvider>
    </UIProvider>
  )
}

export default MyApp
