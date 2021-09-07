import React from 'react';
import { Formik } from 'formik';
import { FieldText } from 'matsumoto/src/components/form';

const ConfirmationHuge = ({ yes, no, children, validationText, submitText, inputPlaceholder, headerText }) => {

    const submitConfirm = (values) => {
        console.log(values, submitText, validationText)
        if ( values.confirmation.toLowerCase().trim() === validationText) {
            yes();
        } else {
            no();
        }
    };

    return (
        <Formik initialValues={{}} onSubmit={submitConfirm}>
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <div className="confirmation-modal confirm-large confirm-huge">
                        <div className="confirm-content">
                            <div className="header-wrapper"><h2>{headerText}</h2></div>
                            <div className="confirm-form-wrapper">
                                <div className="confirm-text">{children}</div>
                                <div className="form">
                                    <FieldText
                                        id="confirmation"
                                        formik={formik}
                                        placeholdedr="input text"
                                        label="Confirmation"
                                    />
                                    <div className="footnote">{inputPlaceholder}</div>
                                </div>
                            </div>
                            <div>
                                <button className="button" type="submit">{submitText}</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default ConfirmationHuge;