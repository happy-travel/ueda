import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import AgencyHeader from './agency-header';
import { Route, Switch } from 'react-router-dom';
import AgenciesList from './list';
import AgencyBalance from './agency-balance';
import AgencyBookings from './agency-bookings';


const AgencyPage = ({ match }) => {
    const [bookings, setBookings] = useState(null);
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByAgency(match.params.id),
            success: (bookings) => {setBookings(bookings)}
        });
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
    }, [])

    return (
        <div className="page-content">
            <AgencyHeader id={match.params.id}/>
            <AgencyNavigation match={match} />
            <Switch>
                <Route path={'/agency/:id/agents'}
                       render={() => <AgenciesList match={match} />}/>
                <Route path={'/agency/:id/transfer-balance'}
                       render={() => <AgencyBalance match={match} />}/>
                <Route path={'/agency/:id/bookings'}
                       render={() => <AgencyBookings match={match} />}/>
            </Switch>
        </div>
    );
}

export default AgencyPage;
