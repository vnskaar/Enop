import React, { useState, useEffect } from "react";
import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import { Button } from 'reactstrap';

/*
const [hostname, setHostname ] = React.useRef();
const [port, setPort ] = React.useRef();
const [user, setUser ] = React.useRef();
const [password, setPassword ] = React.useRef();
*/

function connectHub() {
  
  const hostname = "192.168.2.65"
  const port = "1884"
  const user = "jesper"
  const password = "jesper"
  
  fetch('/connectHub' + "?" + "hostname=" + hostname + "&" + "port="
    + port + "&" + "user=" + user + "&" + "password=" + password).then(res =>
    res.json()).then(data => {
      console.log(data);

    })
}

function GetTime() {
	const [currentTime, setCurrentTime ] = useState(0);

	useEffect(() => {
    fetch('/time').then(res =>
      res.json()).then(data => {
        setCurrentTime(data.time);
        console.log();
      });
  }, [])
}

const Home = () =>

    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-gray-100 text-5xl p-5'>Enop</h1>
            <h1 className='text-gray-400 text-3xl'>The home of Energy Optimization</h1>
           
            <input type="text" name="hostname" placeholder="hostname" />
            <input type="text" name="port" placeholder="port" />
            <input type="text" name="user" placeholder="username" />
            <input type="text" name="password" placeholder="password" />

            <Button onClick={connectHub} className='py-4 w-40 bg-blue-500 rounded-full text-xl hover:bg-blue-300
             flex-col flex items-center'>Connect to hub</Button>

            <img className='mb-14' src={logo} alt="logo"/>
          
            <Button className='py-4 w-40 bg-blue-500 rounded-full text-2xl hover:bg-blue-300
             transition duration-300 ease-in-out flex-col flex items-center animate-bounce'>Get started</Button>
        </div>
    </Layout>;

export default Home;