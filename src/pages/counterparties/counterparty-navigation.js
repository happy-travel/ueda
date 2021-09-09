import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import $auth from 'stores/auth';

const CounterpartyNavigation = observer(({ match }) => {
    const { id } = match.params;

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
    }, []);

    return (
        <div>
            <div className="tabs-navigation">
                { $auth.permitted('CounterpartyManagement') &&
                    <NavLink to={`/counterparties/${id}/details`}>
                        Counterparty Details
                    </NavLink>
                }
                <NavLink to={`/counterparties/${id}/agencies`}>
                    Agencies
                </NavLink>
                { $auth.permitted('MarkupManagement') &&
                    <NavLink to={`/counterparties/${id}/markup-manager`}>
                        Markup Management
                    </NavLink>
                }
                {(
                    $auth.permitted('CounterpartyBalanceObservation') &&
                    accounts &&
                    accounts[0]
                ) &&
                    <NavLink to={`/counterparties/${id}/transfer-balance/account-operations`}>
                        Balance
                    </NavLink>
                }
                {(
                    $auth.permitted('CounterpartyVerification') &&
                    counterparty &&
                    counterparty.verificationState !== 'FullAccess'
                ) &&
                    <NavLink to={`/counterparties/${id}/verification`}>
                        Verification
                    </NavLink>
                }
            </div>
        </div>
    )
});

export default CounterpartyNavigation;

