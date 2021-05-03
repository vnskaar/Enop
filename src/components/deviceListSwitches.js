import React, {Component, useEffect, useRef, useState} from "react";
import thingsReport from '../assets/jsonData/thingsReport.json'
import {CheckBox} from "@material-ui/icons";
import List from "reactstrap/es/List";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup, FormLabel,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CircularProgressbar} from "react-circular-progressbar";

const report = () => {
    const file = require('../assets/jsonData/thingsReport.json')
    const filMap = file.val.map((devices) => devices);

    let counter = 0;
    for (const device of filMap) {
        console.log("This a device: ")
        console.log(device.alias)
        counter++;
    }
    console.log("There are a total of " + counter + " devices connected to the hub")
}


const optimizedDevices = new Set();
let numberofDevices = 0;
let numberOfOptimizedDevices = 0;
let optiPercent = 0;

const file = require('../assets/jsonData/thingsReport.json')
file.val.map((devices) =>
    numberofDevices++
)


const DeviceListSwitches = () => {
    const [percentage, setPercentage] = useState(0);

    const listAllSwitches = () => {


        const listItems = file.val.map((devices) =>
            <ol>
                <li key={devices.id} >
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch id={devices.id} name={devices.alias} onChange={toggleCheckbox}>{devices.id}</Switch>}
                                label={devices.alias}>
                            </FormControlLabel>
                        </FormGroup>
                    </div>
                </li>
            </ol>
        );
        return listItems;
    }
    const handleChange = (event) => {
        console.log("This buttons ID : " + event.target.id + " Status is : " + event.target.checked)
    };

    const toggleCheckbox = svitsj => {
        if (svitsj.target.checked) {
            console.log("Adding " + svitsj.target.name + " to list..")
            optimizedDevices.add(svitsj.target.name);
            numberOfOptimizedDevices++;
        } else {
            console.log("Removing " + svitsj.target.name + " from list..")
            optimizedDevices.delete(svitsj.target.name);
            if (numberOfOptimizedDevices > 0) {
                numberOfOptimizedDevices--;
            }
        }
        optiPercent = (numberOfOptimizedDevices/numberofDevices)*100;
        console.log("The percentage is : " + (optiPercent | 0));
        setPercentage(optiPercent | 0);
    }

    const printSwitches = () => {
        console.log(optimizedDevices)
        console.log("There are a total of " + numberofDevices + " devices connected to the hub")
        console.log("Devices optimized are " + numberOfOptimizedDevices);
        optiPercent = (numberOfOptimizedDevices/numberofDevices)*100;
        console.log("The percentage is : " + (optiPercent | 0));

    }

    return(
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <FormLabel component="legend">Turn Optimized on/off for Devices</FormLabel>
            <ol>
                {listAllSwitches()}
            </ol>
            <Button
                variant="contained" color="primary"
                component={Link} to="/loggedIn"
                onClick={printSwitches}
            >Submit</Button>
        </div>
    )
}
export default DeviceListSwitches


