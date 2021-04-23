import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CheckConnection from "../../components/checkConnection";

const Devices = ({ formData, setForm, navigation }) => {

    const { } = formData;
    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Devices</h3>

            <Button
                variant='contained'
                fullWidth
                color='success.main'
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