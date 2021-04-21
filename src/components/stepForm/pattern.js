import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const Pattern = ({ formData, setForm, navigation }) => {

    const { val1, val2, val3, val4 } = formData;

    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Pattern</h3>
            <TextField
                label='First up'
                name='val1'
                value={val1}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='Last leave'
                name='val2'
                value={val2}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='First home'
                name='val3'
                value={val3}
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                fullWidth />
            <TextField
                label='Last bed'
                name='val4'
                value={val4}
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

export default Pattern