import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import CounterpartyNavigation from './counterparty-navigation';
import CounterpartyTransferBalanceNavigation from './counterparty-transfer-balance-navigation';

const CounterpartyTransferBalanceInfo = ({ match }) => {

    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterpartyAccountsList(match.params.id),
            success: (accounts) => {
                setAccounts(accounts);
            }
        });
    }, [])

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            {accounts?.[0] && <CounterpartyTransferBalanceNavigation
                match={match}
                accountId={accounts[0].id} />}
        </div>
    )
}

export default CounterpartyTransferBalanceInfo;

