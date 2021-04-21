import React from "react";
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";

const Account = ({ formData, setForm, navigation }) => {

    const { name, email, password, confirmPassword } = formData;
    console.log(navigation)

    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Account info</h3>
                <TextField
                    label='Name'
                    name='name'
                    value={name}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />
                <TextField
                    label='Email'
                    name='email'
                    value={email}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />
                <TextField
                    label='Password'
                    name='password'
                    value={password}
                    onChange={setForm}
                    type='password'
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />
                <TextField
                    label='Confirm Password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />

                <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    style={{ marginTop: '1rem'}}
                    onClick={() => navigation.next()}
                >
                    Next
                </Button>
        </Container>
    )
}

export default Account