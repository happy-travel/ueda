import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyVerification = ({ match, verify, verifyReadonly }) => {

    const [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, []);

    return (
        <div className="buttons" style={{ marginBottom: '10px' }}>
            {counterparty && counterparty.verificationState !== 'FullAccess' &&
            counterparty.verificationState !== 'ReadOnly' &&
            <div className="vertical-toolbar-element">
                <button className="button" onClick={verifyReadonly}>Verify Readonly</button>
            </div>}
            {counterparty && counterparty.verificationState === 'ReadOnly' &&
            <div className="vertical-toolbar-element">
                <button className="button" onClick={() => verify('CashPayments')}>Verify Cash Payments</button>
                <button className="button" onClick={() => verify('CreditPayments')}>Verify Virtual Account Payments
                </button>
                <button className="button" onClick={() => verify('CreditCardPayments')}>Verify Credit Card
                    Payments
                </button>
            </div>}
        </div>
    )
}

export default CounterpartyVerification;