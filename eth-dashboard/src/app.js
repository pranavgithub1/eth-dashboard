import React from 'react';
import GraphsPage from "./pages/GraphsPage";
import StatsPage from "./pages/StatsPage";
import "./app.css";
import { BrowserRouter, Route } from 'react-router-dom';
const App = () => {
    
    return (
        <div>
            {/* <ThemeProvider theme={theme}> */}
                {/* <CssBaseline/> */}
                <BrowserRouter>
                    <Route exact path="/" component = {StatsPage}/>
                    <Route exact path="/graphs" component = {GraphsPage}/>
                </BrowserRouter>
            {/* </ThemeProvider> */}
        </div>
    )
}

export default App