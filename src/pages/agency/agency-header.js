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
    }, [])

    return (
        <div className="settings block">
            <div className="header-info">
                <h1>Agency #{id}</h1>
                <div className="text">
                    {Boolean(agencyAccounts) &&
                    <div className="text-row">
                        <h3 className="key">Balance:</h3>
                        <h3 className="status Success value">{price(agencyAccounts?.[0]?.balance.currency, agencyAccounts?.[0]?.balance.amount)}
                        </h3>
                    </div>
                    }
                </div>
            </div>
    </div>)
}

export default AgencyHeader;