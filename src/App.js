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
      <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/wiz">
              <Wiz />
          </Route>
          <Route exact path="/about">
              <About />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;

