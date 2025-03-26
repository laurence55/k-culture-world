import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B46C1', // Purple
      light: '#9F7AEA',
      dark: '#553C9A',
    },
    secondary: {
      main: '#1B5E20', // Traditional Korean green (Cheong)
      light: '#4CAF50',
      dark: '#003300',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    error: {
      main: '#B71C1C',
      light: '#E53935',
      dark: '#7F0000',
    },
    success: {
      main: '#1B5E20',
      light: '#4CAF50',
      dark: '#003300',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#000000',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#000000',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#000000',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#000000',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#000000',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#000000',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          borderWidth: '2px',
        },
        contained: {
          backgroundColor: '#6B46C1',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#553C9A',
            boxShadow: '0 2px 4px rgba(107, 70, 193, 0.2)',
          },
        },
        outlined: {
          borderColor: '#6B46C1',
          color: '#6B46C1',
          '&:hover': {
            borderColor: '#553C9A',
            backgroundColor: 'rgba(107, 70, 193, 0.04)',
          },
        },
        text: {
          color: '#6B46C1',
          '&:hover': {
            backgroundColor: 'rgba(107, 70, 193, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.95))',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: '1px solid rgba(107, 70, 193, 0.1)',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.95))',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#6B46C1',
          border: '2px solid #FFFFFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#6B46C1',
          color: '#000000',
          boxShadow: '0 2px 8px rgba(107, 70, 193, 0.2)',
          borderBottom: '2px solid rgba(107, 70, 193, 0.1)',
          '& .MuiTypography-root': {
            color: '#000000',
            fontWeight: 600,
          },
          '& .MuiButton-root': {
            color: '#000000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
          '& .MuiIconButton-root': {
            color: '#000000',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '2px solid rgba(107, 70, 193, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#6B46C1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6B46C1',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#6B46C1',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6B46C1',
          '&.Mui-checked': {
            color: '#6B46C1',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#6B46C1',
          '&.Mui-checked': {
            color: '#6B46C1',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(107, 70, 193, 0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#6B46C1',
          '&:hover': {
            backgroundColor: 'rgba(107, 70, 193, 0.04)',
          },
        },
      },
    },
  },
});

export default theme; 