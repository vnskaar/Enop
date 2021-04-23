import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Home, About, Wiz, Login, LoggedIn} from './pages'
import { Nav } from './layout'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
        TextField: {
            color: 'white',
            textcolor: 'white',
            background: 'white',
        },

    },
});

function App() {
  return (
      <Router>
          <Nav />
          <switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route exact path="/wiz">
                  <Wiz />
              </Route>
              <Route exact path="/about">
                  <About />
              </Route>
              <Route exact path="/login">
                  <Login />
              </Route>
              <Route exact path="/loggedIn">
                  <LoggedIn />
              </Route>
          </switch>
      </Router>


  );
}

export default App;

