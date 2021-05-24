import React, { useState } from "react";
import {
    Button,
    FormControlLabel,
    FormGroup,
    Switch,
    Typography
} from "@material-ui/core";
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
    const [automationStatus, setAutomationStatus] = useState(null)

    optimizedDevices.forEach((device) => {
        if (!chosenDevices.has(device)) {
            optimizedDevices.delete(device);
            optiPercent = (optimizedDevices.size/numberofDevices)*100;
        }
    })

    const [percentage, setPercentage] = useState(optiPercent | 0);
    const toggleSwitch = thisSwitch => {
        if (thisSwitch.target.checked) {
            console.log("Adding " + thisSwitch.target.name + " to list..")
            optimizedDevices.add(thisSwitch.target.name);
        } else {
            console.log("Removing " + thisSwitch.target.name + " from list..")
            optimizedDevices.delete(thisSwitch.target.name);
        }
        optiPercent = (optimizedDevices.size/numberofDevices)*100;
        console.log("The percentage is : " + (optiPercent | 0));
        setPercentage(optiPercent | 0);
    }

    const submitAutomations = () => {
        setAutomationStatus("Sending automations...")
        fetch('/updateSchedule' + "?" + "hostname=" + allFormData['hubAddress'] +
            "&" + "user=" + allFormData['hubUsername'] +
            "&" + "password=" + allFormData['hubPassword'] +
            "&" + "up=" + allFormData['val1'] +
            "&" + "leave=" + allFormData['val2'] +
            "&" + "home=" + allFormData['val3'] +
            "&" + "sleep=" + allFormData['val4']).then(res =>
            res.json()).then(data => {
            console.log(data)
            setAutomationStatus(data.Status)

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
                <li key={device.id.toString()} >
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
        <div style={{ width: 300, height: 200 }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
            />
            <Typography variant='h4' className='p-5'>Turn Optimization on/off for Devices</Typography>
            <ol>
                {listAllSwitches()}
            </ol>
            <p style={{padding: 15}}>{automationStatus}</p>

            <Button
                variant="contained" color="primary"
                onClick={submitAutomations}
            >Submit</Button>
        </div>
    )
}
export default DeviceListSwitches


