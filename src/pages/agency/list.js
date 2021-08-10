import React from 'react';
import AgencyNavigation from './agency-navigation';
import AgentsList from '../agents/agents';
import AgencyHeader from './agency-header';

const AgenciesList = ({ match }) => {
    return (
        <div className="page-content">
            <AgencyHeader id={match.params.id}/>
            <AgencyNavigation match={match}/>
            <AgentsList id={match.params.id}/>
        </div>
    )
}

export default AgenciesList;