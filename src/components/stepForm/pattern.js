import React from "react";
import {TextField, Container, Button, Grid, Typography} from "@material-ui/core";
import {allFormData} from "./hub.js";







const Pattern = ({ formData, setForm, navigation }) => {

    const { val1, val2, val3, val4 } = formData;

    return (
        <Container maxWidth='xs'>
            <Typography variant='h4' className='text-gray-400 text-3xl'>Household schedule</Typography>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant='body1' style={{paddingTop: 30}}>When does the first person usually get up in the morning? </Typography>
            <TextField
                label='First up'
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
                <Typography variant='body1' style={{paddingTop: 30}}>When does the last person usually leave for school/work? </Typography>
            <TextField
                label='Last leave'
                name='val2'
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
                <Typography variant='body1' style={{paddingTop: 30}}>When does the first person usually get home? </Typography>
            <TextField
                label='First home'
                name='val3'
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
                <Typography variant='body1' style={{paddingTop: 30}}>When does the last person usually go to bed at night? </Typography>
            <TextField
                label='Last bed'
                name='val4'
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