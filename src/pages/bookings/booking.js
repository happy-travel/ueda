import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import Breadcrumbs from 'matsumoto/src/components/breadcrumbs';
import BookingConfirmationView from './booking-confirmation-view';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationMedium from '../../components/confirms/confirmation-medium';

const Booking = ({ match }) => {
    const [booking, setBooking] = useState(null);

   useEffect(() => {
       API.get({
           url: apiMethods.bookingsByReferenceCode(match.params.refCode),
           success: (booking) => {
               setBooking(booking)
           }
       });
   }, [])

    const bookingCancel = () => {
        confirmationModal(ConfirmationMedium).then(
            () => {
                API.post({
                    url: apiMethods.bookingCancel(booking.bookingId),
                    success: () => Notifications.addNotification('Cancelled', null, 'success')
                });
            }
        )
    }

    const bookingDiscard = () => {
        confirmationModal(confirmation).then(
            () => {
                API.post({
                    url: apiMethods.bookingDiscard(this.state.booking.bookingId),
                    success: () => Notifications.addNotification('Discarded', null, 'success')
                });
            }
        )
    }

    const bookingPaymentCompleteManually = () => {
        confirmationModal(confirmation).then(
            () => {
                API.post({
                    url: apiMethods.paymentCompleteManually(this.state.booking.bookingId),
                    success: () => Notifications.addNotification('Success', null, 'success'),
                });
            }
        )
    }

    const paymentConfirm = () => {
        confirmationModal(confirmation).then(
            () => {
                API.post({
                    url: apiMethods.paymentConfirm(this.state.booking.bookingId),
                    success: () => Notifications.addNotification('Success', null, 'success'),
                });
            }
        )
    }

    return (
        <div className="confirmation block page-content-no-tabs">
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '50px 0 30px' }}>
                <div className="buttons">
                    <button className="button" onClick={bookingCancel}>Cancel</button>
                    <button className="button" onClick={bookingDiscard}>Discard</button>
                    <button className="button" onClick={bookingPaymentCompleteManually}>
                        Manually Complete Payment
                    </button>
                    <button className="button" onClick={paymentConfirm}>Confirm Payment</button>
                </div>
            </div>
            <Breadcrumbs
                backText="Back"
            />
            {booking && <BookingConfirmationView referenceCode={match.params.refCode} /> }
        </div>
    );
}

export default Booking;
