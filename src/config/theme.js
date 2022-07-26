import { createTheme } from '@mui/material/styles';

const goudyBookletter = "'Goudy Bookletter 1911', serif"

const theme = createTheme({
  palette: {
    primary: {
      main: '#816c57',
    },
    secondary: {
      main: '#576c81',
    },
  },
  typography: {
    useNextVariants: true,
    h2: {
      fontFamily: goudyBookletter,
      fontVariant: 'small-caps',
      color: '#ffffff',
    },
    h4: {
      fontFamily: goudyBookletter,
      fontWeight: 900,
      fontSize: '24px',
      fontVariant: 'small-caps',
      color: '#ffffff'
    },
    h5: {
      fontFamily: goudyBookletter,
      color: '#ffffff',
    }
  }
});

export default theme;
