import React from "react";
import { TextField, Container, Button, Grid } from "@material-ui/core";


const Pattern = ({ formData, setForm, navigation }) => {

    const { val1, val2, val3, val4 } = formData;

    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Household schedule</h3>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
            <TextField
                label='First up'
                defaultValue="06:00"
                name='val1'
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                type='time'
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <TextField
                label='Last leave'
                name='val2'
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                type='time'
                defaultValue="08:00"
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            <TextField
                label='First home'
                name='val3'
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                type='time'
                defaultValue="15:00"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}

            />
            <TextField
                label='Last bed'
                name='val4'
                onChange={setForm}
                margin='normal'
                variant='outlined'
                autoComplete='off'
                type='time'
                defaultValue="23:00"
                InputLabelProps={{
                    shrink: true}}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
            </Grid>

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