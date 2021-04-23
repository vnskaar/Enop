import React from 'react';
import {Layout} from "../layout";
import GetDevices from "../components/getDevices";
import Button from "@material-ui/core/Button";


const About = () =>
    <Layout>
        <div>
            <h1 className='text-gray-100 text-5xl p-5'>About Enop</h1>

            <p className='m-10'>
                Click here to send a command to the hub
            </p>

            <Button variant="contained" color="primary" onClick={GetDevices} >Send Command</Button>

        </div>

    </Layout>;

export default About;