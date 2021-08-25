import React, { useState, useEffect } from 'react';
import Bookings from 'parts/bookings/bookings';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const AgentBookings = ({ agentId }) => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByAgent(agentId),
            success: (bookings) => {setBookings(bookings)}
        })
    }, []);

    return(
        <Bookings
            bookings={bookings}
        />
    );
};

export default AgentBookings;
