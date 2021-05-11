import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import GoToWizButton from "../components/goToWizButton";
import {Typography} from "@material-ui/core";


const Home = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <Typography variant='h2'>Enop </Typography>
            <Typography variant='h4'>The Home of Energy Optimization </Typography>
            <img className='mb-1' src={logo} alt="logo"/>
            <GoToWizButton></GoToWizButton>
        </div>
    </Layout>;

export default Home;