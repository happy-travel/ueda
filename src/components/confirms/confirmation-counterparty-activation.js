import React from 'react';
import { Formik } from 'formik';
import { FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const ConfirmationCounterpartyActivation = ({ yes, no, children, submitText, inputPlaceholder, headerText, status, id }) => {

    const activate = (reason) => {
        API.post({
            url: apiMethods.activateCounterparty(id),
            body: { reason },
            success: () => {
                Notifications.addNotification('Counterparty activated', null, 'success');
            }
        });
    };

    const deactivate = (reason) => {
        API.post({
            url: apiMethods.deactivateCounterparty(id),
            body: { reason },
            success: () => {
                Notifications.addNotification('Counterparty deactivated', null, 'success');
            }
        });
    };

    const submitConfirm = (values) => {
        if (status) {
            yes();
            return deactivate(values.confirmation);
        } else {
            yes();
            return activate(values.confirmation);
        }
    };

    return (
        <Formik initialValues={{}} onSubmit={submitConfirm}>
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <div className="confirmation-modal confirm-large confirm-huge">
                        <div className="confirm-content">
                            <div className="header-wrapper"><h2>{headerText}</h2></div>
                            <div className="confirm-text">{children || 'Null'}</div>
                            <div className="form">
                                <FieldText
                                    id="confirmation"
                                    formik={formik}
                                    placeholdedr="input text"
                                    label="Confirmation"
                                />
                                <div className="footnote">{inputPlaceholder}</div>
                            </div>
                            <div>
                                <button className="button" type="submit">{submitText}</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default ConfirmationCounterpartyActivation;