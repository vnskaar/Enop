import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {FormGroup, FormLabel, makeStyles, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'black',
    }

}));

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const classes = useStyles();


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/home")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <>
            <Container maxWidth='xs'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormGroup id="email">
                            <TextField
                                className={classes.black}
                                label='Email'
                                type='email'
                                color='primary'
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                required
                                inputRef={emailRef}
                            >
                            </TextField>
                        </FormGroup>
                        <FormGroup id="password">
                            <TextField
                                className={classes.black}
                                label='Password'
                                type='password'
                                color='secondary'
                                variant="outlined"
                                margin='normal'
                                fullWidth
                                required
                                inputRef={passwordRef}
                            />
                        </FormGroup>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot your Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}