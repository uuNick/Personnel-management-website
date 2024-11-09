import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E90FF;',
            light: '#84c2ff',
            dark: '#2c75ff',
            contrastText: '#121212',
        },
        secondary: {
           main: '#000000',
        },
        // custom: {
        //   main: '#f44336',
        // },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.75em',
                    padding: '1em 2em',
                    margin: '0',
                    border: '1px solid #ededed',
                    transition: '240ms ease-out',
                    textTransform: 'none',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        // backgroundColor: '#1E90FF',
                        backgroundColor: "#003f7b",
                        // backgroundColor: "#2c75ff",
                        color: '#FFF'
                    }
                },
            },
        },
    },
},
);

export default theme;