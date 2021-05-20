import React from "react";
import { Layout } from '../layout'
import 'react-circular-progressbar/dist/styles.css';
import DeviceListSwitches from "../components/deviceListSwitches";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";

const Dashboard = () => {
    return(
        <Layout>
            <Container maxWidth='xs'>
                <div className='flex flex-col justify-center items-center'>
                    <Typography variant='h2' className='p-5'>Optimization Dashboard</Typography>
                    <Typography variant='h4' className='p-5'>How optimized you are:</Typography>
                        <DeviceListSwitches></DeviceListSwitches>

                </div>
            </Container>

        </Layout>
)
}
export default Dashboard;