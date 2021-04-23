import React, { useState, useEffect } from "react";
import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import Button from '@material-ui/core/Button';
import GoToWizButton from "../components/goToWizButton";


const Home = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-gray-600 font-light text-5xl p-5'>Enop</h1>
            <h1 className='text-gray-500 text-3xl'>The home of Energy Optimization</h1>

            <img className='mb-1' src={logo} alt="logo"/>

            <GoToWizButton></GoToWizButton>
        </div>
    </Layout>;

export default Home;