import React, {useState} from 'react';
import { NavLink } from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { lightTheme, darkTheme} from '../styles/theme'

const navs = [
    {
        path: '/home',
        name: 'Home'
    },
    {
        path: '/dashboard',
        name: 'Dashboard'
    },
    {
        path: '/',
        name: 'Logout'
    },
];

const Nav = () => {
    return (
        <nav className='p-5 bg-gray-500'>
            <ul className='flex space-x-10 justify-end text-white text-xl'>
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
    )

};

 export default Nav;