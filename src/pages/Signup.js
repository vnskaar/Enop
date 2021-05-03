import React from 'react';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";
import fire from "../config/fire";
import Grid from "antd/es/card/Grid";


const Login = (props) => {


    function signUp() {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
                console.log('Successfully Signed Up');
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
    }




    return(
        <Container maxWidth='xs'>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-gray-400 text-3xl'>Sign Up</h3>
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
                    <Grid>
                        <Button
                            onClick={signUp}
                            variant="contained" color="primary"
                        >
                            Signup
                        </Button>
                    </Grid>
                </div>


            </div>

        </Container>
    )

}

export default Login
