import * as Yup from 'yup';

export const ValidatorConfirmReason = Yup.object().shape({
    confirmation: Yup.string()
        .required('*'),
})