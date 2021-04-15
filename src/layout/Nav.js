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
    <nav className='bg-warning p-4 shadow'>
        <ul className='flex space-x-10 justify-end'>
            {navs.map(navItem => (
            <li>
                <NavLink exact to={navItem.path}
                    activeClassName='border-b-2 border-black'>
                        {navItem.name}
                </NavLink>
            </li>
            ))}
        </ul>
    </nav>
);

 export default Nav;