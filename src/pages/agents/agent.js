import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import { Route, Switch } from 'react-router-dom';
import AgentNavigation from './agent-navigation';
import AgentChangeAgency from './agent-change-agency';
import AgentBookings from './agent-bookings';
import AgentSearchOptions from './agent-search-options';

const AgencyPage = ({ match }) => {

    const [agent, setAgent] = useState({});

    useEffect(() => {
        API.get({
            url: apiMethods.agencyAgents(match.params.id),
            success: (list) => {
                setAgent(list.filter((item) => item.agentId === Number(match.params.agentId))[0])
            }
        });
    }, [])


    const submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.agentSettingsAvailabilitySearch(match.params.id, match.params.agentId),
            body: {
                values,
                enabledSuppliers: values
                    .enabledSuppliers
                    .keys()
                    .map((item) => values.enabledSuppliers[item] && item)
                    .filter((item) => item)
            },
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

    return (
        <div className="settings block page-content">
            <div className="header-info">
                <h1>Agent #{match.params.agentId} (Agency #{match.params.id})</h1>
                <div className="text">
                    <div className="text-row">
                        <h3 className="key">Name:</h3>
                        <h3 className="value">{agent.name}</h3>
                    </div>
                    <div className="text-row">
                        {/*<h3 className="key">Created: <h3>{date.format.a(agent.created * 1000)}</h3></h3>*/}
                        <h3 className="key">Created:</h3>
                        <h3 className="value">{date.format.a(agent.created * 1000)}</h3>
                    </div>
                    {agent.markupSettings &&
                    <div className="text-row">
                        <h3 className="key">Markup:</h3>
                        <h3 className="value">{agent.markupSettings}</h3>
                    </div>}
                    {agent.isActive &&
                    <div className="text-row">
                        <h3 className="key">Status:</h3>
                        <h3 className="status Success value">Active</h3>
                    </div>}
                    {agent?.isActive === false &&
                    <div className="text-row">
                        <h3 className="key">Status:</h3>
                        <h3 className="status Success value">Inactive</h3>
                    </div>}
                </div>
                <AgentNavigation id={match.params.id} agentId={match.params.agentId} />
            </div>
            <Switch>
                <Route path={'/agency/:id/agents/:agentId/change-agency'}
                       render={() => <AgentChangeAgency id={match.params.id} agentId={match.params.agentId} />}/>
                <Route path={'/agency/:id/agents/:agentId/bookings'}
                       render={() => <AgentBookings agentId={match.params.agentId} />}/>
                <Route path={'/agency/:id/agents/:agentId/search-options'}
                       render={() => <AgentSearchOptions id={match.params.id} agentId={match.params.agentId} />}/>
            </Switch>
        </div>
    );
}

export default AgencyPage;
