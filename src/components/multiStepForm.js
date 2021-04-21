import React from "react";
import { useForm, useStep} from 'react-hooks-helper'
import { Account, Hub, Pattern, Devices } from "./stepForm/index";


const data = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    hubAddress: '',
    hubPort: '',
    hubUsername: '',
    hubPassword: '',

    val1: '',
    val2: '',
    val3: '',
    val4: ''
}

const steps = [
    { id: 'account'},
    { id: 'hub'},
    { id: 'pattern'},
    { id: 'devices'},
]

const MultiStepForm = () => {
    const [formData, setForm] = useForm(data)
    const { step, navigation } = useStep({
        steps,
        initialStep :0
    })

    const props = { formData, setForm, navigation}

    switch (step.id) {
        case 'account':
            return <Account { ...props } />;
        case 'hub':
            return <Hub { ...props } />;
        case 'pattern':
            return <Pattern { ...props } />;
        case 'devices':
            return <Devices { ...props } />;
    }

    return (
        <div>

        </div>
    )

}

export default MultiStepForm