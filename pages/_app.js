import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { CookiesProvider } from 'react-cookie';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans,Noto Sans Thai'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ThemeProvider >
  );
}

export default MyApp
