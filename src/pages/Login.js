import React from 'react';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {Link, Route} from "react-router-dom";
import fire from "../config/fire";
import Grid from "antd/es/card/Grid";
import {LoggedIn} from "./index";


const Login = (props) => {

    function login() {
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        fire.auth().signInWithEmailAndPassword(email, password)
            .then ((u) => {
                console.log('signed in');

            })
            .catch((err) => {
                console.log('error' + err.toString())
            })
    }


    return(
        <Container maxWidth='xs'>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-gray-400 text-3xl'>Login</h3>
                <div>
                    <TextField
                        id='email'
                        label='Email'
                        type='email'
                        color='primary'
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        required

                    />

                    <TextField
                        id='password'
                        label='Password'
                        type='password'
                        color='secondary'
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        required

                    />
                </div>

                <div>
                    <Button
                        onClick={login}
                        variant="contained" color="primary"

                    >
                        Login
                    </Button>

                    <Button
                        variant="contained" color="primary"
                        component={Link} to="/signup"
                    >
                        Signup
                    </Button>
                </div>


            </div>

        </Container>
    )

}

export default Login
