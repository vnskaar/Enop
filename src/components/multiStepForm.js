import React from "react";
import { useForm, useStep} from 'react-hooks-helper'
import { Hub, Pattern, Devices } from "./stepForm/index";


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
    { id: 'hub'},
    { id: 'pattern'},
    { id: 'devices'},
    { id: 'LoggedIn'},
]

const MultiStepForm = () => {
    const [formData, setForm] = useForm(data)
    const { step, navigation } = useStep({
        steps,
        initialStep :0
    })

    const selectedDevices = new Set();

    const props = { formData, setForm, navigation, selectedDevices }

    switch (step.id) {
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