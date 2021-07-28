import React from 'react';
import graphsPage from "./pages/graphsPage";
import statsPage from "./pages/statsPage";
import "./app.css";
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
const App = () => {
    return (
        <div>
            <CssBaseline/>
            <BrowserRouter>
                <Route exact path="/" component = {statsPage}/>
                <Route exact path="/graphs" component = {graphsPage}/>
            </BrowserRouter>
        </div>
    )
}

export default App