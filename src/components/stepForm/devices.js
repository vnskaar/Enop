import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table"

const Devices = ({ formData, setForm, navigation }) => {

    const { } = formData;
    const data = JSON.stringify(formData)

    return (
        <Container maxWidth='xs'>
            <h3 className='text-gray-400 text-3xl'>Devices</h3>
            <Table>

            </Table>

            <div className='m-10'>
                <Button
                    variant='contained'
                    fullWidth
                    color='success.main'
                    style={{ marginTop: '1rem'}}
                    onClick={console.log(formData)}
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
            </div>



        </Container>
    )
}

export default Devices