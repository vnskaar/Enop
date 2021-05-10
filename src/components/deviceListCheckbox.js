import React, {Component} from "react";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

export const chosenDevices = new Set();

const toggleBox = box => {
    if (box.target.checked) {
        console.log("Adding " + box.target.name + " to list..")
        chosenDevices.add(box.target.name);
    } else {
        console.log("Removing " + box.target.name + " from list..")
        chosenDevices.delete(box.target.name);
    }
}

function checkIfChecked(deviceAlias) {
    return chosenDevices.has(deviceAlias);
}

const DeviceListCheckbox = () => {
    let data = require('../assets/jsonData/thingsReport.json')
    //let data = require('../assets/jsonData/deviceList.json')

    return(
        <div>
            <ol>
                {
                    data.val.map(device => (
                        <li key={device.id} >
                            <div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox name={device.alias} id={device.id.toString()} defaultChecked={checkIfChecked(device.alias)} onChange={toggleBox}>{device.id}</Checkbox>}
                                        label={device.alias}>
                                    </FormControlLabel>
                                </FormGroup>

                            </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}
export default DeviceListCheckbox


