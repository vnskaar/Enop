import React from 'react';
import { NavLink } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link} from 'react-router'

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
    {
        path: '/login',
        name: 'Login'
    },
];


const Nav = () => (
    <nav className='bg-gray-800 p-4'>
        <AccountBoxIcon className='absolute float-left text-white fontSizeLarge'/>
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