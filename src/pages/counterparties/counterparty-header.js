import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import { price, remapStatus } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';
import { FieldSwitch } from 'matsumoto/src/components/form';
import Notifications from 'matsumoto/src/stores/notifications-store';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationHuge from '../../components/confirms/confirmation-huge';

const CounterpartyHeader = observer(({ id }) => {

    const [counterparty, setCounterparty] = useState(null);
    const [balance, setBalance] = useState(null);

    const ConfirmationActivate = ({ yes, no }) => {
        return (
            <ConfirmationHuge
                yes={yes}
                no={no}
                submitText="I understand the consequences, deactivate this counterparty"
                validationText="deactivate"
                headerText="You are about to deactivate a counterparty access"
                inputPlaceholder="Please type deactivate">
                All its agents loose an ability to use the system until the counterparty will be re-activated.
                Please enter a reason to deactivate.
            </ConfirmationHuge>
        )
    }

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
        API.get({
            url: apiMethods.accountBalance(id, 'USD'),
            success: (balance) => {
                setBalance(balance);
            }
        });
    }, [])

    const statusChange = () => {
        confirmationModal(ConfirmationActivate).then(
            () => {
                if (counterparty?.isActive) {
                    return deactivate();
                }
                return activate();
            }
        )
    }

    const activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateCounterparty(id),
            body: { reason },
            success: () => Notifications.addNotification('Counterparty activated', null, 'success')
        });
    }

    const deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateCounterparty(id),
            body: { reason },
            success: () => Notifications.addNotification('Counterparty deactivated', null, 'success')
        });
    }

    return (
        <div className="settings block counterparty-header">
            <div className="header-info">
                <h1>{counterparty?.name}</h1>
                <div className="text">
                    {Boolean(balance) &&
                    <div className="text-row">
                        <h3 className="key">Balance:</h3>
                        <h3 className="status Success value">{price(balance[0]?.currency, balance[0]?.balance)}</h3>
                    </div>
                    }
                    {counterparty?.isActive &&
                    <div className="text-row">
                        <h3 className="key">Status:</h3>
                        <h3 className="status Success value">Active</h3>
                    </div>}
                    {counterparty?.isActive === false &&
                    <div className="text-row">
                        <h3 className="key">Status:</h3>
                        <h3 className="status Success value">Inactive</h3>
                    </div>}
                    <div className="text-row">
                        <h3 className="key">State:</h3>
                        <h3 className="value">{remapStatus(counterparty?.verificationState)}</h3>
                    </div>
                    {$auth.permitted('CounterpartyVerification') &&
                    <CachedForm
                        render={(formik) => (
                            <div className="row">
                                <FieldSwitch
                                    formik={formik}
                                    onChange={statusChange}
                                    value={counterparty?.isActive}/>
                            </div>
                        )}/>
                    }
                </div>
            </div>
        </div>
    )
});

export default CounterpartyHeader;