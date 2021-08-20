import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import { price, remapStatus } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';
import { FieldSwitch } from 'matsumoto/src/components/form';
import Notifications from 'matsumoto/src/stores/notifications-store';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import confirmationModal from 'components/confirmation-modal';
import confirmation from '../../components/confirms/confirm-cancel'

const CounterpartyHeader = observer(({ id }) => {

    let [counterparty, setCounterparty] = useState(null);
    const [balance, setBalance] = useState(null);

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
        confirmationModal(confirmation).then(
            () => {
                if (counterparty?.isActive) {
                    return activate();
                }
                return deactivate();
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
                        <h3 className="status Success value">{price(balance.currency, balance.balance)}</h3>
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