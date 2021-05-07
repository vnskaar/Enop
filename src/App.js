import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Home, About, Wiz, LoggedIn } from './pages'
import Login from './components/login'
import { Nav } from './layout'
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/signup";


export default App;


function App() {
    return (



        <div>
            <div>
                <Router>
                    <Nav />
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/home" component={Home} />
                            <PrivateRoute exact path="/wiz" component={Wiz} />
                            <PrivateRoute exact path="/about" component={About} />
                            <PrivateRoute exact path="/loggedIn" component={LoggedIn} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/" component={Login} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </div>


        /*
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
        */
    );
}
