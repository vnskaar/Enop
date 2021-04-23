import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const Hub = ({ formData, setForm, navigation }) => {

    const { hubAddress, hubPort, hubUsername, hubPassword } = formData;

    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Hub info</h3>
            <TextField
                label='Hub Address'
                name='hubAddress'
                value={hubAddress}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='Hub Port'
                name='hubPort'
                value={hubPort}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='Hub Username'
                name='hubUsername'
                value={hubUsername}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='Hub Password'
                name='hubPassword'
                value={hubPassword}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />

            <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{ marginTop: '1rem'}}
                onClick={() => navigation.next()}
            >
                Next
            </Button>

            <Button
                variant='contained'
                fullWidth
                color='secondary'
                style={{ marginTop: '1rem'}}
                onClick={() => navigation.previous()}
            >
                Previous
            </Button>


        </Container>
    )
}

export default Hub