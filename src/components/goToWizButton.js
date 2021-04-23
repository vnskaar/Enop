import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'



const GoToWizButton = () =>

    <Button variant="contained" color="primary"
        className='animate-bounce'
        component={Link} to="/wiz"
    >
        Get started
    </Button>



export default GoToWizButton