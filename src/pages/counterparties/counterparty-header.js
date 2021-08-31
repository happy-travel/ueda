import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { price, remapStatus } from 'matsumoto/src/simple';
import CachedForm from 'matsumoto/src/components/form/cached-form';
import Notifications from 'matsumoto/src/stores/notifications-store';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationCounterpartyActivation from 'components/confirms/confirmation-counterparty-activation';
import $auth from 'stores/auth';

const CounterpartyHeader = observer(({ id }) => {

    const [counterparty, setCounterparty] = useState(null);
    const [balance, setBalance] = useState(null);
    const [status, setStatus] = useState(null);

    const ConfirmationActivate = ({ yes, no }) => {
        return (
            <ConfirmationCounterpartyActivation
                id={id}
                status={status}
                yes={yes}
                no={no}
                submitText="I understand the consequences, deactivate this counterparty"
                headerText="You are about to deactivate a counterparty access"
                inputPlaceholder="Enter the reason">
                All its agents loose an ability to use the system until the counterparty will be re-activated.
                Please enter a reason to deactivate.
            </ConfirmationCounterpartyActivation>
        )
    };

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(id),
            success: (counterparty) => {
                setStatus(status === null ? counterparty?.isActive : status)
                setCounterparty(counterparty);
            }
        });
        API.get({
            url: apiMethods.accountBalance(id, 'USD'),
            success: (balance) => {
                setBalance(balance);
            }
        });
    }, [status]);

    const statusChange = () => {
        confirmationModal(ConfirmationActivate).then(
            (onClose) => {
                if (status) {
                    setStatus(false);
                    return onClose();
                }
                    setStatus(true);
                    onClose();

            }
        )
    };

    return (
        <div className="settings block counterparty-header">
            <div className="header-info">
                <h1>{counterparty?.name}</h1>
                { Boolean(counterparty) && <>
                    { Boolean(balance) &&
                        <div>
                            Balance: <strong className="green">{price(balance[0]?.currency, balance[0]?.balance)}</strong>
                        </div>
                    }
                    <div>
                        State: <strong>{remapStatus(counterparty.verificationState)}</strong>
                    </div>
                    <div>
                        Status: { status ? <span className="green">Active</span> : <strong>Inactive</strong> }
                    </div>
                    { $auth.permitted('CounterpartyVerification') &&
                        <CachedForm
                            onSubmit={statusChange}
                            render={(formik) => (
                                <div className="row">
                                    <div className="inner">
                                        {status !== null &&
                                        <button type="submit" className="button">
                                            {(status && 'Deactivate') ||
                                            (status === false && 'Activate')}
                                        </button>
                                        }
                                    </div>
                                </div>
                            )}
                        />
                    }
                </> }
            </div>
        </div>
    )
});

export default CounterpartyHeader;