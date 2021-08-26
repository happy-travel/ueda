import React from 'react';
import AgencyNavigation from './agency-navigation';
import AgentsList from '../agents/agents';
import AgencyHeader from './agency-header';

const AgenciesList = ({ match }) => {
    return (
        <div>
            <AgentsList id={match.params.id}/>
        </div>
    )
}

export default AgenciesList;