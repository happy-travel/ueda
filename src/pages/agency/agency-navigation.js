import React from 'react';
import { NavLink } from 'react-router-dom';


const AgencyNavigation = ({ match }) => {
    const { id } = match.params
    return (
        <div className="counterparty-tabs-navigation">
            <NavLink to={`/counterparties/agencies/${id}/bookings`}>
                Bookings
            </NavLink>
            <NavLink to={`/counterparties/agencies/${id}/transfer-balance`}>
                Balance
            </NavLink>
            <NavLink to={`/counterparties/agencies/${id}/settings`}>
                Agency Settings
            </NavLink>
            <NavLink to={`/counterparties/agencies/${id}/agents`}>
                Agents List
            </NavLink>
        </div>
    )
}

export default AgencyNavigation;