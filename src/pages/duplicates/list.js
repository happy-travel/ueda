import React, { useState, useEffect } from 'react';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';
import { date } from 'matsumoto/src/simple';

const duplicatesListPage = () => {
    const [list, setList] = useState(null);
    useEffect(() => {
        API.get({
            url: apiMethods.duplicates,
            success: (list) => {setList(list)}
        });
    }, [])

    return (
        <div className="block list page-content-no-tabs">
            <h1>Duplicates list</h1>
            <div className="table-wrapper">
                <Table
                    list={list}
                    columns={ [
                        {
                            header: 'ID',
                            cell: 'id',
                        },
                        {
                            header: 'Status',
                            cell: 'state',
                        },
                        {
                            header: 'Created',
                            cell: (cell) => date.format.a(cell.created),
                        },
                        {
                            header: 'Creator',
                            cell: 'agentName',
                        },
                        {
                            header: 'Accommodation A',
                            cell: (cell) => cell.accommodations?.[0].supplier + ': ' + cell.accommodations?.[0].id
                        },
                        {
                            header: 'Accommodation B',
                            cell: (cell) => cell.accommodations?.[1].supplier + ': ' + cell.accommodations?.[1].id
                        },
                    ]}
                    onRowClick={(item) => redirect(`/duplicates/${item.id}`)}
                    textEmptyResult="No duplicates reports found"
                    textEmptyList="No duplicates reports found (empty)"
                    searches={(v) => [
                        String(v.id), v.state, v.agentName, v.countryName,
                        v.accommodations?.[0].supplier,
                        v.accommodations?.[1].supplier,
                        v.accommodations?.[0].id,
                        v.accommodations?.[1].id,
                    ]}
                />
            </div>
        </div>
    );
}

export default duplicatesListPage;
