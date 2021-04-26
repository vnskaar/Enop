import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { red, green, blue } from '@material-ui/core/colors/';



const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#18303f',
        },
        Nav :{
            default: 'C4C4C4',
        },
        typography: {
            color: 'white',
        },
        primary: {
            main: '#00ac83',
        },
        secondary: {
            main: '#f94409',
        },
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        background: {
            default: '#DADADA',
        },
        Nav :{
            default: 'F94409',
        },
        typography: {
            color: 'black',
        },
        primary: {
            main: '#00ac83',
        },
        secondary: {
            main: '#f94409',
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

