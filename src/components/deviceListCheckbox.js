import React, {Component} from "react";
import thingsReport from '../assets/jsonData/thingsReport.json'
import {Checkbox, FormControlLabel, FormGroup, ListItem, ListItemIcon, ListItemText, Switch} from "@material-ui/core";

function handleDeviceToggle() {

}

const DeviceListCheckbox = () => {

    const data = require('../assets/jsonData/thingsReport.json')

    let isOn;
    return(
        <div>
            <ol>
                {
                    data.val.map(values => (
                        <li key={values.id} >
                            <div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox toggled={isOn} onChange={handleDeviceToggle}>{values.id}</Checkbox>}
                                        label={values.alias}>
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


