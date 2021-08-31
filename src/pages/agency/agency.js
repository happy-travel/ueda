import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import AgencyHeader from './agency-header';
import { Route, Switch } from 'react-router-dom';
import AgenciesList from './list';
import AgencyBalance from './agency-balance';
import AgencySettings from './agency-settings';
import AgencyBookings from './agency-bookings';


const AgencyPage = ({ match }) => {
    const [bookings, setBookings] = useState(null);
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);
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
        API.get({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            success: (availabilitySearchOptions) => {
                // Убрать условие, когда изменят ответ пустых настроек style={{
                if (availabilitySearchOptions) {
                    setAvailabilitySearchOptions({
                        ...availabilitySearchOptions,
                        enabledSuppliers: Object.keys(availabilitySearchOptions
                            .enabledSuppliers)
                            .reduce(( a, key ) => (a[key] = true, a), {})
                    })
                }

            },
            error: setAvailabilitySearchOptions(false)
        });
    }, [])

    const submitDisplayedPaymentOptions = (values) => {
        API.put({
            url: apiMethods.displayedPaymentOptions(match.params.id),
            body: values.displayedPaymentOptions,
            success: () => Notifications.addNotification('Saved', null, 'success')
        });
    }

    const submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.availabilitySearchOptions(match.params.id),
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

    const activate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.activateAgency(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Agency activated', null, 'success')
        });
    }

    const deactivate = () => {
        let reason = prompt('Enter a reason');
        API.post({
            url: apiMethods.deactivateAgency(match.params.id),
            body: { reason },
            success: () => Notifications.addNotification('Agency deactivated', null, 'success')
        });
    }
    return (
        <div className="page-content">
            <AgencyHeader id={match.params.id}/>
            <AgencyNavigation match={match} />
            <Switch>
                <Route path={'/agency/:id/agents'}
                       render={() => <AgenciesList match={match} />}/>
                <Route path={'/agency/:id/transfer-balance'}
                       render={() => <AgencyBalance match={match} />}/>
                <Route path={'/agency/:id/settings'}
                       render={() => <AgencySettings match={match} />}/>
                <Route path={'/agency/:id/bookings'}
                       render={() => <AgencyBookings match={match} />}/>
            </Switch>
        </div>
    );
}

export default AgencyPage;
