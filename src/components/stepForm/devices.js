import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import List from "reactstrap/es/List";
import {Link} from "react-router-dom";
import DeviceListCheckbox from "../deviceListCheckbox";


const Devices = ({ formData, setForm, navigation }) => {

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const {} = formData;
    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Select Devices to optimize</h3>
            <div className='w-50'>
            <DeviceListCheckbox/>

            </div>

            <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{ marginTop: '1rem'}}
                component={Link} to="/loggedIn"
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