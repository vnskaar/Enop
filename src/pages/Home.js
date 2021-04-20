import React, { useState, useEffect } from "react";
import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import { Button } from 'reactstrap';
import GetExtendedset from "../components/getExtendedset";


const Home = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-gray-100 text-5xl p-5'>Enop</h1>
            <h1 className='text-gray-400 text-3xl'>The home of Energy Optimization</h1>

            <img className='mb-14' src={logo} alt="logo"/>
          
            <Button className='py-4 w-40 bg-blue-500 rounded-full text-2xl hover:bg-blue-300
             transition duration-300 ease-in-out flex-col flex items-center animate-bounce'>Get started</Button>

            <Button onClick={GetExtendedset} className='py-4 w-40 bg-blue-500 rounded-full text-xl hover:bg-blue-300
             flex-col flex items-center'>Send Command</Button>
        </div>
    </Layout>;

export default Home;