import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {FormGroup, FormLabel, makeStyles, TextField, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {Layout} from "../layout";

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
        <Layout>
            <Container maxWidth='xs'>
                    <Typography variant='h4'>Login</Typography>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <FormGroup id="email">
                            <TextField
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
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className="w-100 mt-10"
                            type="submit"
                        >
                            Log In
                        </Button>
                    </form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot your Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-3">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
            </Container>
        </Layout>
    )
}