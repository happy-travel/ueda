import React from 'react';
import { price } from 'matsumoto/src/simple';

const AgencyHeader = ({ id, accounts }) => {
    return (
        <div className="settings block agency-header">
            <div className="header-info">
                <h1>Agency #{id}</h1>
                { Boolean(accounts) &&
                    <div>
                        Balance: <strong className="green">
                            {accounts?.[0]?.balance ? price(accounts?.[0]?.balance.currency, accounts?.[0]?.balance.amount) : 'Unknown'}
                        </strong>
                    </div>
                }
            </div>
    </div>)
};

export default AgencyHeader;