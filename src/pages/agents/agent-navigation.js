import React from 'react';
import { NavLink } from 'react-router-dom';

const AgentNavigation = ({ id, agentId }) => {
    return (
        <div className="tabs-navigation">
            <NavLink to={`/counterparties/agencies/${id}/agents/${agentId}/bookings`}>
                Bookings
            </NavLink>
            <NavLink to={`/counterparties/agencies/${id}/agents/${agentId}/change-agency`}>
                Change Agency
            </NavLink>
            <NavLink to={`/counterparties/agencies/${id}/agents/${agentId}/search-options`}>
                Agent Search Options
            </NavLink>
        </div>
    )
}

export default AgentNavigation;