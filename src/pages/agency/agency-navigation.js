import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';


const AgencyNavigation = observer(({ match }) => {
    const { id } = match.params
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            success: (availabilitySearchOptions) => {
               setAvailabilitySearchOptions(availabilitySearchOptions)
            },
            error: setAvailabilitySearchOptions(false)
        })
    }, []);


    return (
        <div className="counterparty-tabs-navigation">
            {$auth.permitted('AgentManagement') &&
            <NavLink to={`/counterparties/agencies/${id}/agents`}>
                Agents List
            </NavLink>}
            {$auth.permitted('BalanceManualCorrection') &&
            <NavLink to={`/counterparties/agencies/${id}/transfer-balance`}>
                Balance
            </NavLink>}
            {availabilitySearchOptions &&
            <NavLink to={`/counterparties/agencies/${id}/settings`}>
                Agency Settings
            </NavLink>}
            {$auth.permitted('BookingManagement') &&
            <NavLink to={`/counterparties/agencies/${id}/bookings`}>
                Bookings
            </NavLink>}
        </div>
    )
});

export default AgencyNavigation;