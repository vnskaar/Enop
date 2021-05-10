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

        </Layout>
    </Container>

export default About;