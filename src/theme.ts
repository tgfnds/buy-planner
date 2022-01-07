import {createTheme} from "@mui/material";

let theme = createTheme({
    typography: {
        h1: {
            fontFamily: "comforter",
        },
        h2: {
            fontFamily: "comforter",
        },
        h3: {
            fontFamily: "comforter",
        },
        h4: {
            fontFamily: "comforter",
        },
        h5: {
            fontFamily: "comforter",
        },
        h6: {
            fontFamily: "comforter",
        },
    },
    palette: {
        mode: "dark",
        background: {
            default: "#292D3E",
            paper: "#222634",
        },
        text: {
            primary: "#A6ACCD",
            secondary: "#676E95",
        },
        primary: {
            main: "#ab47bc",
        },
    },
});

theme = createTheme(theme, {
    components: {
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    "&.Mui-active": {
                        color: theme.palette.secondary.main
                    },
                },
                text: {
                    fill: theme.palette.background.default
                }
            }
        },
    }
})

export {theme};