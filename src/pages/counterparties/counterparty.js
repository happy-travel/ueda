import React from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import CounterpartyHeader from './counterparty-header';
import { Route, Switch } from 'react-router-dom';
import CounterpartyDetails from './counterparty-details';
import CounterpartyContract from './counterparty-contract';
import CounterpartyAgencies from './counterparty-agencies';
import CounterpartyMarkupManager from './counterparty-markup-manager';
import CounterpartyTransferBalanceAccountOperations from './counterparty-transfer-balance-account-operations';
import CounterpartyVerification from './counterparty-verification';
import Routes from '../../core/routes';
import agencyPage from '../agency/agency';

const CounterpartyPage = ({ match }) => {

    return (
        <div className="page-content">
            <CounterpartyHeader id={match.params.id} />
            <CounterpartyNavigation match={match}/>
            <Switch>
                <Route path={'/counterparties/:id/details'}
                       render={() => <CounterpartyDetails match={match}/>}/>
                <Route path={'/counterparties/:id/contract'}
                       render={() => <CounterpartyContract match={match}/>}/>
                <Route path={'/counterparties/:id/agencies'}
                       render={() => <CounterpartyAgencies match={match}/>}/>
                <Route path={'/counterparties/:id/markup-manager'}
                       render={() => <CounterpartyMarkupManager match={match}/>}/>
                <Route path={'/counterparties/:id/transfer-balance/account-operations'}
                       render={() => <CounterpartyTransferBalanceAccountOperations match={match}/>}/>
                <Route path={'/counterparties/:id/verification'}
                       render={() => <CounterpartyVerification match={match}/>}/>
            </Switch>
        </div>
    )
}


export default CounterpartyPage;

