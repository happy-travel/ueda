import React from 'react';
import { redirect } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import Table from 'matsumoto/src/components/table';

const BookingsList = ({ bookings }) => {
    return (
        <div className="block list booking">
            <h2>Bookings</h2>
            <div className="table-wrapper-tabs">
                <Table
                    list={bookings}
                    columns={ [
                        {
                            header: 'ID',
                            cell: 'id',
                        },
                        {
                            header: 'Reference Code',
                            cell: 'referenceCode',
                        },
                        {
                            header: 'Status',
                            cell: 'status',
                        },
                        {
                            header: 'Payment Status',
                            cell: 'paymentStatus',
                        },
                        {
                            header: 'Agent ID',
                            cell: 'agentId',
                        },
                        {
                            header: 'Agency ID',
                            cell: 'agencyId',
                        },
                        {
                            header: 'Counterparty ID',
                            cell: 'counterpartyId',
                        },
                        {
                            header: 'Accommodation',
                            cell: (cell) => <>
                                {cell.accommodationName}<br/>
                                {cell.location.country}, {cell.location.locality}
                            </>
                        },
                        {
                            header: 'Created',
                            cell: (cell) => date.format.a(new Date(cell.created))
                        },
                        {
                            header: 'Total Price',
                            cell: 'totalPrice'
                        }
                    ]}
                    onRowClick={(item) => {
                        redirect(`booking/${item.referenceCode}`)
                    }}
                    textEmptyResult="No bookings match your search"
                    textEmptyList="No bookings found"
                    searches={(v) => [
                        String(v.agentId),
                        String(v.agencyId),
                        String(v.counterpartyId),
                        String(v.id),
                        String(v.htId),
                        String(v.referenceCode),
                        String(v.status),
                        String(v.paymentStatus),
                        String(v.paymentMethod),
                        String(v.supplier),
                        String(v.accommodationName)
                    ]}
                />
            </div>
        </div>
    );
};

export default BookingsList;
