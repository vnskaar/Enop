import React from "react";
import { Layout } from '../layout'
import { CircularProgressbar, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel, ListItem, ListItemIcon, ListItemText,
    makeStyles,
    Button, Switch
} from "@material-ui/core";
import List from "reactstrap/es/List";
import {Link} from "react-router-dom";
import DeviceListSwitches from "../components/deviceListSwitches";



const LoggedIn = () => {

    const percentage = 50

    const [state, setState] = React.useState({
        device1: true,
        device2: true,
        device3: true,
        device4: true,
        device5: true,
        device6: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    return(
        <Layout>
            <contrainer maxWidth='xs'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-gray-100 text-5xl p-5'>Optimization management</h1>
                    <h1 className='text-gray-300 text-3xl p-5'>How optimized are you</h1>
                    <div style={{ width: 200, height: 200 }}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                    </div>

                    <div className='m-14'>
                        <FormLabel component="legend">Turn Optimized on/off for Devices</FormLabel>
                        <DeviceListSwitches></DeviceListSwitches>

                    </div>

                    <div>
                        <Button
                            variant="contained" color="primary"
                            component={Link} to="/loggedIn"
                        >
                            Submit
                        </Button>
                    </div>

                </div>
            </contrainer>

        </Layout>
)




}



export default LoggedIn;