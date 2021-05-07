import React from 'react';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";


const Login = () => {
    return(
        <Container maxWidth='xs'>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-gray-400 text-3xl'>Login</h3>
                <TextField
                    label='Email'
                    type='email'
                    color='primary'
                    variant="outlined"
                    margin='normal'
                    fullWidth
                    required

                />

                <TextField
                    label='Password'
                    type='password'
                    color='secondary'
                    variant="outlined"
                    margin='normal'
                    fullWidth
                    required

                />


                <Button
                    variant="contained" color="primary"
                    component={Link} to="/loggedIn"
                >
                    Login
                </Button>
            </div>

        </Container>
    )

}

export default Login
