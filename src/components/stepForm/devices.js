import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CheckConnection from "../../components/checkConnection";
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import List from "reactstrap/es/List";

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

    const { } = formData;
    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Devices</h3>

            <List>
                {[0, 1, 2, 3, 4].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Device ${value + 1}`} />
                        </ListItem>
                    );
                })}
            </List>
            <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{ marginTop: '1rem'}}
                onClick={ () => CheckConnection(formData)}
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