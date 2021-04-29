import {CheckBox} from "@material-ui/icons";
import {ListItem, ListItemText} from "@material-ui/core";
import React from "react";

const Test = () => {

    const data = require('../assets/jsonData/thingsReport.json')

    return(
        <div>
            <ol>
                {
                    data.val.map(values => (
                        <li key={values.id} >
                            <div>
                                <CheckBox>{values.id}</CheckBox>
                                <ListItemText id={values.id} primary={`${values.alias}`} />

                            </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}
export default Test