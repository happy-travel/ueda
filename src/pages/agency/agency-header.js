import React, { useState, useEffect } from 'react';
import { price } from 'matsumoto/src/simple';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const AgencyHeader = ({ id }) => {
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agenciesAccounts(id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
    }, []);

    return (
        <div className="settings block agency-header">
            <div className="header-info">
                <h1>Agency #{id}</h1>
                { Boolean(agencyAccounts) &&
                    <div>
                        Balance: <strong className="green">
                            {agencyAccounts?.[0]?.balance ? price(agencyAccounts?.[0]?.balance.currency, agencyAccounts?.[0]?.balance.amount) : 'Unknown'}
                        </strong>
                    </div>
                }
            </div>
    </div>)
};

export default AgencyHeader;