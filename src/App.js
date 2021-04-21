import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Button } from 'reactstrap';
import { Home, About, Wiz} from './pages'
import { Nav } from './layout'

function GetExtendedset() {
    fetch('/sendCommand')
}

function App() {
  const [currentTime, setCurrentTime ] = useState(0);

  useEffect(() => {
    fetch('/time').then(res =>
      res.json()).then(data => {
        setCurrentTime(data.time);
        console.log();
      });
  }, [])

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

