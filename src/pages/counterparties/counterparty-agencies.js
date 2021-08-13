import React, { useState, useEffect } from 'react';
import Table from 'matsumoto/src/components/table';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Routes from 'core/routes';
import reactHistory from 'matsumoto/src/core/misc/history';
import { Switch } from 'react-router-dom';
import agencyPage from '../agency/agency';
import Route from 'matsumoto/src/core/misc/route';
import CounterpartyMarkupManager from './counterparty-markup-manager';
import AgencyPage from '../agency/agency';

const CounterpartyAgencies = ({ match }) => {

    const [agencies, setAgencies] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.agencies(match.params.id),
            success: (agencies) => {
                setAgencies(agencies);
            }
        });
    }, [])

    return (
        <div className="block list blabla">
            <div className="admin-tab-element-wrapper block">
                <h2>Agencies</h2>
                <div className="table-wrapper">
                    <Table
                    list={agencies}
                    columns={[
                        {
                            header: 'ID',
                            cell: 'id',
                        },
                        {
                            header: 'Name',
                            cell: 'name'
                        },
                    ]}
                    onRowClick={(item) => redirect(`/agency/${item.id}/agents`)}
                    textEmptyResult="No agencies"
                    textEmptyList="No agencies"
                    searches={(v) => [v.id, v.name]}
                />
                </div>
            </div>
        </div>
    )
}

export default CounterpartyAgencies;

