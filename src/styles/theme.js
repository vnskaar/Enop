import React from "react";
import {createMuiTheme} from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: '#18303f',
        },
        Nav: {
            background:{
                default: '#C4C4C4',
            },

        },
        primary: {
            main: '#f94409',
        },
        secondary: {
            main: '#03A9F1',
        },
    },
    typography: {
        fontFamily: 'Dosis',
        h5: {
            fontSize: 20
        },
        h4: {
            color: 'text-gray-400'
        },
        h3: {

        },
        h2: {

        },
    },
});

export const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        background: {
            default: '#c4c4c4',
        },
        Nav: {
            background: {
                default: '#C4C4C4',
            },
        },
        primary: {
            main: '#03A9F1',
        },
        secondary: {
            main: '#f94409',
        },
    },
        typography: {
            fontFamily: 'Dosis',
            h5: {
                fontSize: 20
            },
            h4: {
                color: 'text-gray-400'
            },
            h3: {

            },
            h2: {

            },
        },
    });