import {createTheme, responsiveFontSizes} from '@material-ui/core/styles';

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#124D36', //dark blue color
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFD900', //yellow
    }, 
    background: {
      default: '#FFF7D8', //brand background cream
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: "Titillium Web, Inter, Roboto, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },

  props: {
  MuiButton: {
    variant: 'contained',  
    color: 'primary',     
    },
  },
  overrides: {
    MuiButton: {
      root: {
        height: 42,
        padding: '8px 22px',
        fontFamily: 'Inter',
        fontSize: '15px',
        lineHeight: '26px',
        fontWeight: 600,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        textTransform: 'none',
      },
      containedPrimary: {
        backgroundColor: '#124D36',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#0D3A28',
        },
        '&:active': {
          backgroundColor: '#124D36',
          border: '1px solid #0A2E20',
        },
        '&:disabled': {
          backgroundColor: '#D1D1D1',
          color: '#888',
          boxShadow: 'none',
        },
      },
      
      containedSecondary: {
        backgroundColor: '#FFFFFF', 
        border: '1px solid #7FB3B9',
        color: '#0D3A28',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'rgba(31, 117, 128, 0.10)',
          boxShadow: 'none',
        },
        '&.active': {
          backgroundColor: '#1F758040',
          boxShadow: 'none',
        },
        '&:disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.12)',
          color: 'rgba(0, 0, 0, 0.38)',
          boxShadow: 'none',
        },
      }
    },
}

});

theme = responsiveFontSizes(theme);
export {theme};