import React from 'react';
import Markups from 'matsumoto/src/parts/markups/markups';
import apiMethods from 'core/methods';

const CounterpartyMarkupManager = ({ match }) => (
    <div className="admin-tab-element-wrapper block">
        <h2>Counterparty Markup Management</h2>
        <Markups
            id={match.params.id}
            emptyText={'No markups'}
            markupsRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
            markupRoute={() => apiMethods.counterpartyMarkups(match.params.id)}
        />
    </div>
);

export default CounterpartyMarkupManager;

