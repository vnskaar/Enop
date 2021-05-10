import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {FormGroup, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {Layout} from "../layout";
import Container from "@material-ui/core/Container";

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <Layout>
            <Container maxWidth='xs'>
                <Typography variant='h4'>Sign Up</Typography>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <FormGroup id="email">
                        <TextField
                            label='Email'
                            type='email'
                            color='secondary'
                            variant="outlined"
                            margin='normal'
                            fullWidth
                            required
                            inputRef={emailRef}
                        />
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
                    <FormGroup id="password-confirm">
                        <TextField
                            label='Confirm Password'
                            type='password'
                            color='secondary'
                            variant="outlined"
                            margin='normal'
                            fullWidth
                            required
                            inputRef={passwordConfirmRef}
                        />
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        className="w-100"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Container>

        </Layout>
    )
}