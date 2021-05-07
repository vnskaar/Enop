import React from "react";
import { Layout } from '../layout'
import 'react-circular-progressbar/dist/styles.css';
import DeviceListSwitches from "../components/deviceListSwitches";

const LoggedIn = () => {

    const percentage = 50;

    /*const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };*/

    return(
        <Layout>
            <container maxWidth='xs'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-gray-100 text-5xl p-5'>Optimization management</h1>
                    <h1 className='text-gray-300 text-3xl p-5'>How optimized are you</h1>
                        <DeviceListSwitches></DeviceListSwitches>

                </div>
            </container>

        </Layout>
)
}
export default LoggedIn;