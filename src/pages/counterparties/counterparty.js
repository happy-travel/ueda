import React, { useState, useEffect } from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import CounterpartyHeader from './counterparty-header';
import { Route, Switch } from 'react-router-dom';
import CounterpartyDetails from './counterparty-details';
import CounterpartyAgencies from './counterparty-agencies';
import CounterpartyMarkupManager from './counterparty-markup-manager';
import CounterpartyTransferBalanceAccountOperations from './counterparty-transfer-balance-account-operations';
import CounterpartyTransferBalanceActions from './counterparty-transfer-balance-actions';
import CounterpartyVerification from './counterparty-verification';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyPage = ({ match }) => {

    const [verificationState, setVerificationState] = useState(null);
    const [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setVerificationState(counterparty.verificationState)
                setCounterparty(counterparty);
            }
        });
    },[verificationState])



    const verify = (contractKind) => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyCounterparty(match.params.id),
            body: { contractKind, reason },
            success: () => {
                setVerificationState(contractKind);
                Notifications.addNotification('Counterparty verified', null, 'success')
            }
        });
    }

    const verifyReadonly = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.verifyReadonlyCounterparty(match.params.id),
            body: { reason },
            success: () => {
                setVerificationState('ReadOnly');
                Notifications.addNotification('Counterparty verified readonly', null, 'success');
            }
        });
    }

    return (
        <div className="page-content">
            <CounterpartyHeader id={match.params.id} verificationState={verificationState} />
            <CounterpartyNavigation match={match}/>
            <Switch>
                <Route path={'/counterparties/:id/details'}
                       render={() => <CounterpartyDetails match={match}/>}/>
                <Route path={'/counterparties/:id/agencies'}
                       render={() => <CounterpartyAgencies match={match}/>}/>
                <Route path={'/counterparties/:id/markup-manager'}
                       render={() => <CounterpartyMarkupManager match={match}/>}/>
                <Route path={'/counterparties/:id/transfer-balance/account-operations'}
                       render={() => <CounterpartyTransferBalanceAccountOperations match={match}/>}/>
                <Route path={'/counterparties/:id/transfer-balance/actions'}
                       render={() => <CounterpartyTransferBalanceActions match={match}/>}/>
                <Route path={'/counterparties/:id/verification'}
                       render={() => <CounterpartyVerification match={match}
                       verifyReadonly={verifyReadonly} verify={verify}
                       verificationState={verificationState}/>}/>
            </Switch>
        </div>
    )
}


export default CounterpartyPage;

