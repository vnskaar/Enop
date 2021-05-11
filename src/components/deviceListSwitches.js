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
import {chosenDevices} from "./deviceListCheckbox"
import {allFormData} from "./stepForm/hub.js";

const optimizedDevices = new Set();
let numberofDevices = 0;
let numberOfOptimizedDevices = 0;
let optiPercent = 0;

let file = require('../assets/jsonData/thingsReport.json')
//let file = require('../assets/jsonData/deviceList.json')

file.val.map((devices) =>
    numberofDevices++
)


const DeviceListSwitches = () => {
    optimizedDevices.forEach((device) => {
        if (!chosenDevices.has(device)) {
            optimizedDevices.delete(device);
            optiPercent = (optimizedDevices.size/numberofDevices)*100;
        }
    })
    const [percentage, setPercentage] = useState(optiPercent | 0);
    const toggleSwitch = svitsj => {
        if (svitsj.target.checked) {
            console.log("Adding " + svitsj.target.name + " to list..")
            optimizedDevices.add(svitsj.target.name);
        } else {
            console.log("Removing " + svitsj.target.name + " from list..")
            optimizedDevices.delete(svitsj.target.name);
        }
        optiPercent = (optimizedDevices.size/numberofDevices)*100;
        console.log("The percentage is : " + (optiPercent | 0));
        setPercentage(optiPercent | 0);
    }

    const printSwitches = () => {
        console.log("This is all the formData")
        console.log(allFormData)

        const hostname = "192.168.2.65";
        const user = "jesper";
        const password = "jesper";

        console.log("Devices connected to the hub: ")
        fetch('/getDevices' + "?" + "hostname=" + hostname + "&" + "user=" + user + "&" + "password=" + password).then(res =>
            res.json()).then(data => {
            console.log(data.Devices)
        })

        console.log(optimizedDevices)
        console.log("There are a total of " + numberofDevices + " devices connected to the hub")
        console.log("Devices optimized are " + optimizedDevices.size);
        optiPercent = (optimizedDevices.size/numberofDevices)*100;
        console.log("The percentage is : " + (optiPercent | 0));
    }

    function checkIfOptimized(deviceAlias) {
        return optimizedDevices.has(deviceAlias);
    }
    function checkIfChosen(deviceAlias) {
        return !chosenDevices.has(deviceAlias);
    }

    const listAllSwitches = () => {
        const listItems = file.val.map((device) =>
            <ol>
                <li key={device.id} >
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch id={device.id.toString()} disabled={checkIfChosen(device.alias)} checked={checkIfOptimized(device.alias)} name={device.alias} onChange={toggleSwitch}>{device.id}</Switch>}
                                label={device.alias}>
                            </FormControlLabel>
                        </FormGroup>
                    </div>
                </li>
            </ol>
        );
        return listItems;
    }

    return(
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
            />
            <FormLabel component="legend" style={{padding: 20}}>Turn Optimization On/Off for Devices</FormLabel>
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
export default DeviceListSwitches;


