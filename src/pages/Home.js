import React from 'react';
import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import Button1 from "../components/button";
import { Button } from 'reactstrap';



const Home = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white text-5xl'>Home of Energy Optimization</h1>


            <img className='mb-14' src={logo} alt="logo"/>

            <Button className='py-4 w-40 bg-blue-500 rounded-full text-2xl hover:bg-blue-300
             transition duration-300 ease-in-out flex-col flex items-center animate-bounce'>Get started</Button>{' '}
        </div>
    </Layout>;

export default Home;