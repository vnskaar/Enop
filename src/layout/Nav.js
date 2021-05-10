import React from 'react';
import { NavLink } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const navs = [
    {
        path: '/home',
        name: 'Home'
    },
    {
        path: '/about',
        name: 'About'
    },
    {
        path: '/',
        name: 'Logout'
    },
];

const Nav = () => (
    <nav className='p-4 bg-gray-500' >
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