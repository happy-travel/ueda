import React from 'react';
import { remapStatus } from 'matsumoto/src/simple/formatters/remap-status';
import { Dual } from 'matsumoto/src/components/simple';
import ViewFailed from 'matsumoto/src/parts/view-failed';
import BookingDetailsView from 'matsumoto/src/pages/accommodation/parts/booking-details-view';
import BookingSummary from 'matsumoto/src/pages/accommodation/parts/booking-summary';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const BookingConfirmationView = ({ booking }) => {
    if (!booking)
        return (
            <ViewFailed
                reason="Unable to load a booking confirmation"
            />
        );

    const details = booking.bookingDetails;

    const refreshStatus = () => {
        API.post({
            url: apiMethods.bookingRefreshStatus(booking.bookingId)
        });
    }

    return (
        <>
            <div className="billet-wrapper">
                <div className="billet">
                    <BookingSummary
                        details={booking.bookingDetails}
                        contract={booking}
                        checkInDate={details.checkInDate}
                        checkOutDate={details.checkOutDate}
                        agentReference={details.agentReference}
                    />
                    { booking.paymentStatus &&
                    <Dual
                        a="Payment Status"
                        b={<strong>{booking.paymentStatus.replace(/([A-Z])/g, ' $1')}</strong>}
                    />
                    }
                </div>
                <div className="another">
                    <div className="accent-frame">
                        <div className="data">
                            <div className="first">
                                Booking Reference number<br />
                                <span className={'status ' + details.status}>{details.referenceCode}</span>
                            </div>
                            <div className="second">
                                Status<br/>
                                <strong className={'status ' + details.status}>{remapStatus(details.status)}</strong>
                            </div>
                        </div>
                        <div className="after">
                            <div className="status-updater">
                                <button className="small button" onClick={refreshStatus}>
                                    <span className="icon icon-refresh" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <BookingDetailsView booking={booking} />
                </div>
            </div>
        </>
    );
};

export default BookingConfirmationView;