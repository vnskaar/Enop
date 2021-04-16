import React from 'react';
import {Layout} from "../layout";
import HookMqtt from "../mqtt/Hook";

const About = () =>
    <Layout>
        <h1 className='text-gray-100 text-5xl p-5'>About Enop</h1>

        <HookMqtt />
    </Layout>;

export default About;