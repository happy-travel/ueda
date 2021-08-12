import React from 'react';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';


const BookingsPage = () => {
    const submit = (values) => {
        API.get({
            url: apiMethods.bookingsByReferenceCode(values.refCode),
            success: () => {
                redirect(`/counterparties/agencies/booking/${values.refCode}`)
            },
        })
    }

    return (
        <div className="page-content-no-tabs">
            <CachedForm
                onSubmit={submit}
                render={(formik) => (
                    <div className="form"
                         style={{
                             width: '500px'
                         }}>
                        <div>
                            <h1>Find Booking</h1>
                        </div>
                        <div style={{
                            paddingTop: '30px'
                        }}>
                            <div className="row">
                                <FieldText formik={formik}
                                           placeholder="HTL-AA-12345-6789"
                                           id="refCode"
                                           label="Reference code"
                                />
                            </div>
                        </div>
                        <button className="button"
                                type="submit">
                            Search
                        </button>
                    </div>
                )}/>
        </div>
    )
}

export default BookingsPage;

