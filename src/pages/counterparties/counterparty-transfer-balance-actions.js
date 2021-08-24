import React, { useState, useEffect } from 'react';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { FormGetFormat } from 'core/service/form';
import CounterpartyTransferBalanceNavigation from './counterparty-transfer-balance-navigation';
import FormAmount from '../../components/form/form-amount';
import Notifications from 'matsumoto/src/stores/notifications-store';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationMedium from '../../components/confirms/confirmation-medium';
import { ValidatorTransferBalanceActions } from '../../components/form/validation/validator-transfer-balance-actions';

const CounterpartyTransferBalanceActions = ({ match: id }) => {

    const [accounts, setAccounts] = useState(null);
    const [agencies, setAgencies] = useState(null);
    const [agency, setAgency] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterpartyAccountsList(id.params.id),
            success: (accounts) => {
                setAccounts(accounts);
            }
        });
        API.get({
            url: apiMethods.agencies(id.params.id),
            success: (agencies) => {
               setAgencies(agencies);
            }
        });
        API.get({
            url: apiMethods.accountBalance(id.params.id, 'USD'),
            success: (balance) => {
                setBalance(balance);
            }
        })
    }, [])

    const BalanceActionConfirm = ({ yes, no }) => {
        return (
            <ConfirmationMedium
                yes={yes}
                no={no}>
                Manual operations are for correction of mistakes only
            </ConfirmationMedium>
        )
    }

    const submitTransfer = (values) => {
        confirmationModal(BalanceActionConfirm).then(
            () => {
                API.post({
                    url: apiMethods.transferFromCounterpartyToAgency(values.counterpartyAccountId),
                    body: values,
                    success: () => Notifications.addNotification('Done', null, 'success'),
                    error: () => Notifications.addNotification('Error', null, 'warning')
                })
            }
        )
    }


    const setAgenciesOptions = (agencies) => {
        return agencies?.map((item, index) => (
            {
                text: `Agency #${item.id}`,
                value: index
            }
        ));
    }

    const formChanged = (id) => {
        API.get({
            url: apiMethods.agency(agencies[id].id),
            success: (agency) => {
                setAgency(agency);
            }
        })
    }

    return (
        <div>
            <CounterpartyTransferBalanceNavigation match={id} />
            <div className="block">
                <div>
                    <h2>Transfer Balance</h2>
                    <CachedForm
                        validationSchema={ValidatorTransferBalanceActions}
                        onSubmit={submitTransfer}
                        render={(formik) => (
                            <div className="form">
                                <div className="row wide">
                                    <FieldSelect
                                        formik={formik}
                                        id="counterpartyAccountId"
                                        label="From Account"
                                        placeholder="Please Select"
                                        required
                                        options={FormGetFormat(accounts)}
                                    />
                                </div>
                                <div className="row wide">
                                    <FieldSelect
                                        formik={formik}
                                        id="agency"
                                        label="To Agency"
                                        placeholder="Please Select"
                                        required
                                        setValue={formChanged}
                                        options={setAgenciesOptions(agencies)}
                                    />
                                </div>
                                <div className="row wide">
                                    <FieldSelect
                                        formik={formik}
                                        id="agencyAccount"
                                        label="To Agency Account"
                                        placeholder="Please Select"
                                        required
                                        options={FormGetFormat(agency)}
                                    />
                                </div>
                                <div className="row-group">
                                    <div className="row middle-wide">
                                        <FormAmount formik={formik} />
                                    </div>
                                    <div className="row slim">
                                        <FieldSelect
                                            formik={formik}
                                            placeholder="Currency"
                                            id="currency"
                                            label="Currency"
                                            required
                                            options={[
                                                { value: 'USD', text: 'USD' },
                                                { value: 'EUR', text: 'EUR' },
                                                { value: 'AED', text: 'AED' },
                                                { value: 'SAR', text: 'SAR' }
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <button type="submit" className={`button size-medium ${!formik.isValid && 'disabled'}`}>
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        )}/>
                </div>
            </div>
        </div>
    )
}

export default CounterpartyTransferBalanceActions;

