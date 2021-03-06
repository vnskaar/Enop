import { Layout } from '../layout'
import logo from '../assets/fhlogo.png';
import GoToWizButton from "../components/goToWizButton";
import {Typography} from "@material-ui/core";
import '../styles/style.css'


const Home = () =>
    <Layout>
        <div className='flex flex-col justify-center items-center'>
            <Typography
                variant='h1'
            >
                enop
            </Typography>

            <Typography
                variant='h4'
            >
                The home of Energy Optimization
            </Typography>

            <img className='mb-1' src={logo} alt="logo"/>

            <GoToWizButton></GoToWizButton>
        </div>
    </Layout>;

export default Home;