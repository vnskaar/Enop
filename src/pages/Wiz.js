import React from 'react';
import {Layout} from "../layout";
import MultiStepForm from "../components/multiStepForm";
import {Typography} from "@material-ui/core";

const Wiz = () =>
    <Layout>
        <Typography variant='h2' className='p-5'>enop</Typography>
            <div className='container mx-auto pd-20 flex flex-col justify-center items-center container'>
                <MultiStepForm />
            </div>
    </Layout>;

export default Wiz;