import React from 'react';
import {Layout} from "../layout";
import NewWizard from '../components/newWizard'

const Wiz = () =>
    <Layout>
        <h1 className='text-gray-100 text-5xl p-5'>Get Enoped</h1>
            <div className='container mx-auto pd-20 flex flex-col justify-center items-center container'>
                <NewWizard/>
            </div>

    </Layout>;

export default Wiz;