import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#D4A373',
            light: '#F1E7C6',
        },
        secondary: {
            main: '#E9EDC9',
        },
        background: {
            default: '#FEFAE0',
            paper: '#FAEDCD',
        },
        text: {
            primary: '#5d4037',
            secondary: '#CCD5AE',
        },
    },
    typography: {
        fontFamily: '"Roboto Condensed", sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
    },
});
