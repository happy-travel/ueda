import React, { useState, useEffect } from 'react';
import SearchOptionsForm from '../agency/search-options-form';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const AgentSearchOptions = ({ id, agentId }) => {
    const [availabilitySearchOptions, setAvailabilitySearchOptions] = useState([]);

    useEffect(() => {
        API.get({
            url: apiMethods.agentSettingsAvailabilitySearch(id, agentId),
            success: (availabilitySearchOptions) => {setAvailabilitySearchOptions(availabilitySearchOptions)}
        });
    }, [])

    const submitAvailabilitySearchOptions = (values) => {
        API.put({
            url: apiMethods.agentSettingsAvailabilitySearch(id, agentId),
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
        <div>
            <h2>Availability Search Options</h2>
            {availabilitySearchOptions ?
                <SearchOptionsForm
                    initialValues={availabilitySearchOptions}
                    onSubmit={submitAvailabilitySearchOptions}
                /> :
                <h3>No options found</h3>}
        </div>
    )
}

export default AgentSearchOptions;