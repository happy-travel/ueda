import React, { useState, useEffect } from 'react';
import { API, redirect } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import Table from 'matsumoto/src/components/table';
import apiMethods from 'core/methods';

const AgentsList = ( { id }) => {
    const [list, setList] = useState(null);

    useEffect(()=> {
        API.get({
            url: apiMethods.agencyAgents(id),
            success: (list) => {setList(list)}
        });
    },[])

    return (
        <div className="block">
            <h1>Agents list</h1>
            <div style={{ marginTop: '-100px' }}>
                <Table
                    list={list}
                    columns={ [
                        {
                            header: 'ID',
                            cell: 'agentId',
                        },
                        {
                            header: 'Name',
                            cell: 'name'
                        },
                        {
                            header: 'Active',
                            cell: (cell) => cell.isActive ? 'Yes' : 'No'
                        },
                        {
                            header: 'Created',
                            cell: (cell) => date.format.a(cell.created * 1000)
                        },
                        {
                            header: 'Markup Settings',
                            cell: 'markupSettings'
                        }
                    ]}
                    onRowClick={(item) => redirect(`/counterparties/agencies/${id}/agents/${item.agentId}`)}
                    textEmptyResult="No agents found"
                    textEmptyList="No agents found (empty)"
                    searches={(v) => [String(v.agentId), v.name]}
                />
            </div>
        </div>
    );
}

export default AgentsList;
