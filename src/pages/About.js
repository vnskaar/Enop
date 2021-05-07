import React from 'react';
import {Layout} from "../layout";
import CheckConnection from "../components/checkConnection";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import DeviceListCheckbox from "../components/deviceListCheckbox";
import DeviceListSwitches from '../components/deviceListSwitches'
import Container from "@material-ui/core/Container";


const About = () =>
    <Container maxWidth='xs'>
        <Layout>

                <Typography
                    variant='h2'
                >
                    About Enop
                </Typography>


                <Button variant="contained" color="primary" onClick={CheckConnection} >Send Command</Button>

            <div>
                <h2 className='text-gray-400 text-3xl'>DeviceListSwitches</h2>
                <DeviceListSwitches></DeviceListSwitches>
            </div>

            <div>
                <h2 className='text-gray-400 text-3xl'>DeviceListCheckbox</h2>
                <DeviceListCheckbox></DeviceListCheckbox>
            </div>

        </Layout>
    </Container>

export default About;