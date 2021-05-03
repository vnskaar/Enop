import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, green, blue } from '@material-ui/core/colors/';
import './styles/style.css'
import './assets/fonts/TerminalDosisBold.ttf'


const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#18303f',
        },
        Nav :{
            default: 'C4C4C4',
        },
        MuiTypography: {
            text:{
                color: 'primary'
            },
        },
        primary: {
            main: '#f94409',
        },
        secondary: {
            main: '#03A9F1',
        },
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        background: {
            default: '#DADADA',
        },
        typography: {},

        primary: {
            main: '#03A9F1',
        },
        secondary: {
            main: '#f94409',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

