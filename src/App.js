import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Home, About, Wiz, LoggedIn } from './pages'
import Login from './components/login'
import { Nav } from './layout'
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/signup";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import { Container } from "@material-ui/core";


function App() {
  return (
      <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}

      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/loggedIn" component={LoggedIn} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/loggedIn">
                  <LoggedIn />
                </Route>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>


     /* <Router>
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
*/
  );
}

export default App;

