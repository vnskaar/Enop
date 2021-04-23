import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import { Home, About, Wiz, Login, LoggedIn } from './pages'
import { Nav } from './layout'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        TextField: {
            color: 'white',
            textcolor: 'white',
            background: 'white',
        },
        typography: {
          fontFamily: 'Terminal Dosis'
        }

    },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
      </ThemeProvider>


  );
}

export default App;

