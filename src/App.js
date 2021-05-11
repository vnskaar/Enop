import {
    BrowserRouter,
        Route,
        Switch
} from "react-router-dom";
import { Home, About, Wiz, Dashboard } from './pages';
import Login from './components/login';
import { Nav } from './layout';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/signup";




function App() {

    const LoginContainer = () => (
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
        </div>
    )

    const DefaultContainer = () => (
        <div>
            <Nav />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/wiz" component={Wiz} />
            <PrivateRoute exact path="/about" component={About} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </div>
    )


    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Switch>
                        <Route path='(/)' component={LoginContainer}></Route>
                        <Route path='(/signup)' component={LoginContainer}></Route>
                        <Route path='(/forgot-password)' component={LoginContainer}></Route>
                        <PrivateRoute exact path='(/home)' component={DefaultContainer}></PrivateRoute>
                        <PrivateRoute exact path='(/wiz)' component={DefaultContainer}></PrivateRoute>
                        <PrivateRoute exact path='(/about)' component={DefaultContainer}></PrivateRoute>
                        <PrivateRoute exact path='(/dashboard)' component={DefaultContainer}></PrivateRoute>
                    </Switch>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;