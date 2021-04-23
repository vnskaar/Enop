import React from "react";
import { Layout } from '../layout'


const LoggedIn = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-gray-100 text-5xl p-5'>Logged in</h1>
        </div>
    </Layout>;

export default LoggedIn;