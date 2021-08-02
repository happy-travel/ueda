import React from 'react';
import { FieldText } from 'matsumoto/src/components/form';

const FormAmount = ({ formik }) => {
    return (
        <FieldText
            formik={formik}
            id="amount"
            label="Amount"
            placeholder="Amount"
            numeric
        />
    )
}

export default FormAmount;