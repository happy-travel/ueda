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
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agencyAgents(match.params.id),
            success: (list) => {
                setAgent(list.filter((item) => item.agentId === Number(match.params.agentId))[0])
            }
        });
    }, []);

    // todo: unused. legacy.
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
    };

    return (
        <div className="settings block page-content agent-header">
            <div className="header-info">
                <h1>Agent #{match.params.agentId} in Agency #{match.params.id}</h1>
                { agent && <>
                    <div>
                        Name: <span>{agent.name}</span>
                    </div>
                    <div>
                        Created: <span>{date.format.a(agent.created * 1000)}</span>
                    </div>
                    { agent.markupSettings &&
                        <div>
                            Markup: <span>{agent.markupSettings}</span>
                        </div>
                    }
                    <div>
                        Status: { agent.isActive ? <span className="green">Active</span> : <strong>Inactive</strong> }
                    </div>
                </> }
            </div>
            <AgentNavigation id={match.params.id} agentId={match.params.agentId} />
            <Switch>
                <Route path={'/agency/:id/agents/:agentId/change-agency'}
                       render={() => <AgentChangeAgency id={match.params.id} agentId={match.params.agentId} />}/>
                <Route path={'/agency/:id/agents/:agentId/bookings'}
                       render={() => <AgentBookings agentId={match.params.agentId} />}/>
            </Switch>
        </div>
    );
};

export default AgencyPage;
