import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import SearchOptionsForm from './search-options-form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import AgencyHeader from './agency-header';

const AgencySettings = ({ match }) => {
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.availabilitySearchOptions(match.params.id),
            success: (availabilitySearchOptions) => {
                if (availabilitySearchOptions) {
                    return setAvailabilitySearchOptions({
                        ...availabilitySearchOptions,
                        enabledSuppliers: Object.keys(availabilitySearchOptions
                            .enabledSuppliers)
                            .reduce(( a, key ) => (a[key] = true, a), {})
                    })
                }
            },
            error: setAvailabilitySearchOptions(false)
        })
    }, []);

    return (
        <div>
            <SearchOptionsForm
                id={match.params.id}
            />
        </div>
    )
}

export default AgencySettings;