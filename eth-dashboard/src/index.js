import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from ".//app";
import "./app.css";
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
    palette: {
        type: "dark"
    }
})
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
    </ThemeProvider>
    ,
    document.getElementById("root")
);
