import * as Yup from 'yup';

export const ValidatorTransferBalanceActions = Yup.object().shape({
    amount: Yup.string()
        .required('*'),
    counterpartyAccountId: Yup.string()
        .required('*'),
    agency: Yup.string()
        .required('*'),
    agencyAccount: Yup.string()
        .required('*'),
    currency: Yup.string()
        .required('*'),
})