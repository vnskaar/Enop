import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Home, About, Wiz} from './pages'
import { Nav } from './layout'


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
      </switch>
    </Router>
  );
}

export default App;
