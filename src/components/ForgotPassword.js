import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import {FormGroup, Grid, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {Layout} from "../layout";
import Container from "@material-ui/core/Container";

function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <Layout>
      <Container maxWidth='xs'>
          <Grid
              container
              spacing={0}
              direction="column"
              justify="center"
              style={{ minHeight: '90vh' }}
          >
          <Typography variant='h4'>Password Reset</Typography>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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
            <Button
                variant="contained"
                color="primary"
                disabled={loading}
                className="w-100"
                type="submit"
            >
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            Remember your password? <Link to="/">Login</Link>
          </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
          </Grid>
      </Container>
    </Layout>
  )
}
export default ForgotPassword;