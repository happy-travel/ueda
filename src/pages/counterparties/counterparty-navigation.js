import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CounterpartyHeader from './counterparty-header';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';


const CounterpartyNavigation = ({ match }) => {

    const { id } = match.params

    const [accounts, setAccounts] = useState(null);
    const [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterpartyAccountsList(match.params.id),
            success: (accounts) => {
                setAccounts(accounts);
            }
        });
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, [])

    return (
        <div>
            <CounterpartyHeader id={id} />
            <div className="counterparty-tabs-navigation">
                <NavLink to={`/counterparties/${id}/details`}>
                    Counterparty Details
                </NavLink>
                <NavLink to={`/counterparties/${id}/contract`}>
                    Contract
                </NavLink>
                <NavLink to={`/counterparties/${id}/agencies`}>
                    Agencies
                </NavLink>
                <NavLink to={`/counterparties/${id}/markup-manager`}>
                    Markup Management
                </NavLink>
                {accounts && accounts[0] &&
                <NavLink to={`/counterparties/${id}/transfer-balance/account-operations`}>
                    Balance
                </NavLink>}
                {counterparty && counterparty.verificationState !== 'FullAccess' &&
                <NavLink to={`/counterparties/${id}/verification`}>
                    Verification
                </NavLink>}
            </div>
        </div>
    )
}

export default CounterpartyNavigation;

