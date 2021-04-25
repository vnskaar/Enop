import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import { Home, About, Wiz, Login, LoggedIn } from './pages'
import { Nav } from './layout'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";


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

