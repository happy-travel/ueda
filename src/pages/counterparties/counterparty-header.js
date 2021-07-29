import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import { price, remapStatus } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';
import { FieldSwitch } from 'matsumoto/src/components/form';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyHeader = ({ id }) => {

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
        if (counterparty?.isActive) {
            return activate();
        }
        return deactivate();
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
        <div className="counterparty-header">
            <h1>{counterparty?.name}</h1>
            {Boolean(balance) &&
                <h4>
                    Balance: {price(balance.currency, balance.balance)}
                </h4>
            }
            <h3>Status: {counterparty?.isActive ? 'Active' : 'Inactive'}</h3>
            <h3 style={{ marginBottom: '30px' }}>State: {remapStatus(counterparty?.verificationState)}</h3>
            <CachedForm
                render={(formik) => (
                    <div className="row">
                        <FieldSwitch
                            formik={formik}
                            onChange={statusChange}
                            value={counterparty?.isActive}/>
                    </div>
                )}/>

        </div>
    )
}

export default CounterpartyHeader;