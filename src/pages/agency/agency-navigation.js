import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';



const AgencyNavigation = observer(({ match }) => {
    const { id } = match.params


    return (
        <div className="tabs-navigation">
            {$auth.permitted('AgentManagement') &&
            <NavLink to={`/agency/${id}/agents`}>
                Agents List
            </NavLink>}
            {$auth.permitted('BalanceManualCorrection') &&
            <NavLink to={`/agency/${id}/transfer-balance`}>
                Balance
            </NavLink>}
            {$auth.permitted('BookingManagement') &&
            <NavLink to={`/agency/${id}/bookings`}>
                Bookings
            </NavLink>}
        </div>
    )
});

export default AgencyNavigation;