import React from 'react';
import {Layout} from "../layout";
import NewWizard from '../components/newWizard'
import MultiStepForm from "../components/multiStepForm";

const Wiz = () =>
    <Layout>
        <h1 className='text-3xl text-white p-10'>Get Enoped</h1>
            <div className='container mx-auto pd-20 flex flex-col justify-center items-center container'>
                <MultiStepForm />
            </div>
    </Layout>;

export default Wiz;