import React, { useState, useEffect } from 'react';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Table from 'matsumoto/src/components/table';

const AdminsList = () => {

    const [list, setList] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.administrators,
            success: (list) => {
                setList(list)
            }
        });
    }, [])

    return (
        <div className="block list">
            <div className="table-wrapper">
                <Table
                list={list}
                columns={[
                    {
                        header: 'ID',
                        cell: 'id',
                    },
                    {
                        header: 'First Name',
                        cell: 'firstName'
                    },
                    {
                        header: 'Last Name',
                        cell: 'lastName'
                    },
                    {
                        header: 'Position',
                        cell: 'position'
                    },
                    {
                        header: 'State',
                        cell: (cell) => cell.isActive ? 'Active' : 'Inactive'
                    },
                ]}
                onRowClick={(item) => redirect(`/admins/${item.id}/details`)}
                textEmptyResult="No counterparties found"
                textEmptyList="No counterparties found (empty)"
                searches={(v) => [String(v.id), v.firstName, v.lastName, v.position, v.isActive ? 'Active' : 'Inactive']}/></div>
        </div>
    )
}

export default AdminsList;