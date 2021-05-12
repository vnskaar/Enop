import React from "react";
import { Layout } from '../layout'
import 'react-circular-progressbar/dist/styles.css';
import DeviceListSwitches from "../components/deviceListSwitches";

const Dashboard = () => {
    return(
        <Layout>
            <container maxWidth='xs'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-gray-100 text-5xl p-5'>Optimization Dashboard</h1>
                    <h1 className='text-gray-300 text-3xl p-5'>How optimized you are:</h1>
                        <DeviceListSwitches></DeviceListSwitches>

                </div>
            </container>

        </Layout>
)
}
export default Dashboard;