import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import usrflow from '../../assets/usr.gif'
import ipflow from '../../assets/ip.gif'
import Tooltip from 'react-png-tooltip'

let flag_loggedin = 0;

export const allFormData = [];

function isLoggedin() {
    return flag_loggedin !== 1;
}

let counter = 0;

const useStyles = makeStyles((theme) => ({
    tooltips: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: 15,
    },
    content: {
        display: "column",
        alignItems: "center",
        justify: "center",
    }
}))

const Hub = ({ formData, setForm, navigation }) => {

    const { hubAddress, hubUsername, hubPassword } = formData;
    const [connection, setConnection] = useState("Connection unknown");
    const [buttonState, setButtonState] = useState(isLoggedin);

    const classes = useStyles();

    function CheckConnection(props) {
        setConnection("Checking connection...")
        const formData = props;

        const hostname = formData.hubAddress;
        const user = formData.hubUsername;
        const password = formData.hubPassword;

        fetch('/checkConnection' + "?" + "hostname=" + hostname + "&" + "user=" + user + "&" + "password=" + password).then(res =>
            res.json()).then(data => {
            setConnection(data.Status);
            if (data.Status === "Connection successful!") {
                setButtonState(false)
                flag_loggedin = 1;
            }
            else {
                setButtonState(true)
                if (counter >= 5) {
                    setConnection('Want to bypass? Leave Hub Address empty and use "demo" as username and password')
                    counter = 0;
                }
                counter++;
            }
            if (data.Status === "Connection bypassed. Welcome!") {
                setButtonState(false)
                flag_loggedin = 1;
            }
        })
    }


    return (
        <Container maxWidth='xs'>
            <Typography variant='h4' className=''>Hub info</Typography>
            <div>
                <TextField
                    label='Hub Address'
                    name='hubAddress'
                    defaultValue={allFormData['hubAddress']}
                    value={hubAddress}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />
                <div className={classes.tooltips}>
                    <Tooltip>
                        <div className={classes.content}>
                            <Typography variant='h5'>How to find hub ip</Typography>
                            <img width='60%' height='60%' src={ipflow} alt='ipflow'/>
                        </div>
                    </Tooltip>


                </div>

                <TextField
                    label='Hub Username'
                    name='hubUsername'
                    value={hubUsername}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                />

                <TextField
                    label='Hub Password'
                    type='password'
                    name='hubPassword'
                    value={hubPassword}
                    onChange={setForm}
                    margin='normal'
                    variant='outlined'
                    autoComplete='off'
                    fullWidth />
            </div>
            <div className={classes.tooltips}>
                    <Tooltip>
                        <div className={classes.content}>
                            <Typography variant='h5'>How to find username and password</Typography>
                            <img width='60%' height='60%' src={usrflow} alt='userflow'/>
                        </div>
                    </Tooltip>
            </div>

            <div>
                <p>{connection}</p>
                <Button
                    variant='contained'
                    fullWidth

                    style={{ backgroundColor: '#023B2E', color:"white", marginTop: '1rem'}}
                    onClick={ () => CheckConnection(formData)}
                >
                    Check Connection
                </Button>

                <Button
                    variant='contained'
                    fullWidth
                    disabled={buttonState}
                    color='primary'
                    style={{ marginTop: '1rem'}}
                    onClick={() => navigation.next()}
                >
                    Next
                </Button>
            </div>
        </Container>
    )
}

export default Hub