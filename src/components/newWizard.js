import StepWizard from "react-step-wizard";
import React from 'react';


const NewWizard = () => {
    const [formStep, setFormStep] = React.useState(1);

    const nextStep = () => {
        setFormStep(cur => cur + 1)
    }
    const preStep = () => {
        setFormStep(cur => cur - 1)
    }

    const renderButton = () => {
        if (formStep < 3) {
            return (
                <button
                    onClick={nextStep}
                    type="button"
                    className="mt-6 bg-green-600 text-white rounded px-2 py-3 w-full disabled:bg-gray-400
                                    disabled:cursor-not-allowed hover:bg-green-700 "
                >
                    Next Step
                </button>
            )
        }
         if (formStep > 2){
            return (
                <button
                    onClick={preStep}
                    type="button"
                    className="mt-6 bg-red-600 text-white rounded px-2 py-3 w-full disabled:bg-gray-400
                                    disabled:cursor-not-allowed hover:bg-red-700 "
                >
                    Previous Step
                </button>
            )
        }
    }

    return (
            <div className='flex flex-col'>
                <form className='px-20 py-20 text-white bg-blue-700 rounded-md w-full'>
                    {formStep === 1 && (
                        <section className='flex-col text-black'>
                            <h2 className="font-semibold text-3xl mb-8">
                                Who you
                            </h2>
                        </section>
                    )}
                    {formStep === 2 && (
                        <section>
                            <h2 className="font-semibold text-3xl mb-8">
                                Hub info
                            </h2>
                        </section>
                    )}
                    {formStep === 3 && (
                        <section>
                            <h2 className="font-semibold text-3xl mb-8">
                                User pattern
                            </h2>
                        </section>
                    )}
                    <section className='flex justify-content'>
                        {renderButton()}
                    </section>
                </form>
            </div>

        )

};
export default NewWizard;


