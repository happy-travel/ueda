import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import { Loader } from 'matsumoto/src/components/simple';
import Breadcrumbs from 'matsumoto/src/components/breadcrumbs';
import BookingConfirmationView from './booking-confirmation-view';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationLarge from 'components/confirms/confirmation-large';
import ConfirmationHuge from 'components/confirms/confirmation-huge';

const Booking = ({ match }) => {
    const [booking, setBooking] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        API.get({
            url: apiMethods.bookingsByReferenceCode(match.params.refCode),
            success: (booking) => {
                setBooking(booking);
            },
            after: () => {
                setLoaded(true);
            }
        });
    }, []);

    const ConfirmCancelBooking = ({ yes, no }) => {
        return (
            <ConfirmationLarge yes={yes}
                               no={no}>
                You are about to cancel a booking.
                This action *cannot* be undone. This will will request a cancellation on supplier's side
                and permanently cancel the booking *ref_code* in the system in case of success.
            </ConfirmationLarge>
        )
    };

    const ConfirmCompletePaymentManually = ({ yes, no }) => {
        return (
            <ConfirmationLarge yes={yes}
                               no={no}>
                This action *cannot* be undone. This will mark a payment for the booking *ref_code*
                as *paid* in the system.
            </ConfirmationLarge>
        )
    };

    const ConfirmCreditCardPayment = ({ yes, no }) => {
        return (
            <ConfirmationLarge yes={yes}
                               no={no}>
                This action *cannot* be undone. This will mark a payment for the booking *ref_code* as *paid*
                in the system.
                Before executing this action, make sure the payment was fulfilled by a corresponding payment processor.
            </ConfirmationLarge>
        )
    };

    const ConfirmationDiscard = ({ yes, no }) => {
        return (
            <ConfirmationHuge
                yes={yes}
                no={no}
                submitText="I understand the consequences, discard this booking"
                headerText="You are about to discard a booking"
                validationText={match.params.refCode}
                inputPlaceholder={`Please type ${match.params.refCode} to discard`}>
                This action *cannot* be undone. This will permanently close the booking *ref_code* in the system.
                Use the discard feature only when you absolutely sure the booking has cancelled on a suppliers's side.
            </ConfirmationHuge>
        )
    };

    const bookingCancel = () => {
        confirmationModal(ConfirmCancelBooking).then(
            () => {
                API.post({
                    url: apiMethods.bookingCancel(booking.bookingId),
                    success: () => Notifications.addNotification('Cancelled', null, 'success')
                });
            }
        )
    };

    const bookingDiscard = () => {
        confirmationModal(ConfirmationDiscard).then(
            () => {
                API.post({
                    url: apiMethods.bookingDiscard(booking.bookingId),
                    success: () => Notifications.addNotification('Discarded', null, 'success')
                });
            }
        )
    };

    const bookingPaymentCompleteManually = () => {
        confirmationModal(ConfirmCompletePaymentManually).then(
            () => {
                API.post({
                    url: apiMethods.paymentCompleteManually(booking.bookingId),
                    success: () => Notifications.addNotification('Success', null, 'success'),
                });
            }
        )
    };

    const paymentConfirm = () => {
        confirmationModal(ConfirmCreditCardPayment).then(
            () => {
                API.post({
                    url: apiMethods.paymentConfirm(booking.bookingId),
                    success: () => Notifications.addNotification('Success', null, 'success'),
                });
            }
        )
    };

    return (
        <div className="confirmation block page-content-no-tabs">
            <Breadcrumbs
                backText="Back"
            />
            { !loaded ?
                <Loader /> :
                <>
                    { Boolean(booking) &&
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
                    }
                    <BookingConfirmationView booking={booking} />
                </>
            }
        </div>
    );
};

export default Booking;
