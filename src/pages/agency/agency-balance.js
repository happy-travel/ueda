import React, { useState, useEffect } from 'react';
import AgencyNavigation from './agency-navigation';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import AgencyHeader from './agency-header';
import NoteCard from 'parts/note';

const AgencyBalance = ({ match }) => {
    const [agencyAccounts, setAgencyAccounts] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agenciesAccounts(match.params.id),
            success: (agencyAccounts) => setAgencyAccounts(agencyAccounts),
        });
    }, [])

    return (
        <div className="agency-balance">
            <NoteCard>
                Sorry, this page isn't available for a while
            </NoteCard>
        </div>
    )
}

export default AgencyBalance;