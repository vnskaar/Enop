import React from 'react';
import {Layout} from "../layout";
import CheckConnection from "../components/checkConnection";
import Button from "@material-ui/core/Button";


const About = () =>
    <Layout>
        <div>
            <h1 className='text-gray-100 text-5xl p-5'>About Enop</h1>

            <Button variant="contained" color="primary" onClick={CheckConnection} >Send Command</Button>

        </div>

    </Layout>;

export default About;