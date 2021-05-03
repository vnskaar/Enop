import {BrowserRouter as Router, Route} from "react-router-dom";
import { Home, About, Wiz, Login, LoggedIn, Signup } from './pages'
import { Nav } from './layout'
import React, { Component } from 'react';
import fire from './config/fire'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };

        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {

        return(
                <div>
                    <Router>
                        { this.state.user ? ( <Home /> ) : ( <LoggedIn/> ) }
                        <Nav/>
                        <switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route exact path="/wiz">
                                <Wiz/>
                            </Route>
                            <Route exact path="/about">
                                <About/>
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                            <Route exact path="/loggedIn">
                                <LoggedIn/>
                            </Route>
                            <Route exact path="/signup">
                                <Signup/>
                            </Route>
                        </switch>
                    </Router>
                </div>

        );


    }
}

export default App;