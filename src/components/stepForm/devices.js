import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import DeviceListCheckbox from "../deviceListCheckbox";
import {allFormData} from "./hub";

const Devices = ({ formData, setForm, navigation }) => {
    for (const entry in formData) {
        allFormData[entry] = formData[entry]
    }

    console.log("All Form Data:")
    console.log(allFormData)

    const {} = formData;
    return (
        <Container maxWidth='xs'>
            <Typography variant='h4' className=''>Select Devices to optimize</Typography>
            <div className='w-50'>
            <DeviceListCheckbox/>

            </div>

            <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{ marginTop: '1rem'}}
                component={Link} to="/dashboard"
            >
                Submit
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

export default Devices