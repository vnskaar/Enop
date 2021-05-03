import React, {Component} from "react";
import {Checkbox, FormControlLabel, FormGroup, ListItem, ListItemIcon, ListItemText, Switch} from "@material-ui/core";

const DeviceListSwitches = ({isOn, handleDeviceToggle}) => {

    const data = require('../assets/jsonData/thingsReport.json')

    return(
        <div>
            <ol>
                {
                    data.val.map(values => (
                        <li key={values.id} >
                            <div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch toggled={isOn} onChange={handleDeviceToggle}>{values.id}</Switch>}
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
export default DeviceListSwitches


