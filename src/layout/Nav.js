import React from 'react';
import { NavLink } from 'react-router-dom'
import nav from '../styling/nav.css'

const navs = [
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/about',
        name: 'About'
    },
    {
        path: '/wiz',
        name: 'Wiz'
    },
];


const Nav = () => (
    <nav className='bg-gray-800 p-4'>
        <ul className='flex space-x-10 justify-end text-white'>
            {navs.map(navItem => (
            <li>
                <NavLink exact to={navItem.path}
                    activeClassName='border-b-2 border-white '>
                        {navItem.name}
                </NavLink>
            </li>
            ))}
        </ul>
    </nav>
);

 export default Nav;