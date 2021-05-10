import {BrowserRouter, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Home, About, Wiz, LoggedIn } from './pages'
import Login from './components/login'
import { Nav } from './layout'
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/signup";



const LoginContainer = () => (
    <div>
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
    </div>
)

const DefaultContainer = () => (
    <div>
        <div>
            <Nav />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/wiz" component={Wiz} />
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/loggedIn" component={LoggedIn} />
        </div>
    </div>
)


function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <Route exact path='(/)' component={LoginContainer}></Route>
                        <PrivateRoute component={DefaultContainer}></PrivateRoute>
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;