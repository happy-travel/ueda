import React from 'react';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import confirmation from '../../components/confirms/confirmation-medium';


const AgentChangeAgency = ({ id, agentId }) => {

    const changeAgency = (values) => {
        confirmationModal(confirmation).then(
            () => {
                API.post({
                    url: apiMethods.agentChangeAgency(id, agentId),
                    body: values.newAgencyId,
                    success: () => Notifications.addNotification('Changed', null, 'success')
                })
            }
        )
    }

    return (
        <div className="page-content">
            <h2>Change Agency</h2>
            <CachedForm
                enableReinitialize
                onSubmit={changeAgency}
                render={(formik) => (
                    <div className="form section-slim">
                        <div className="row">
                            <FieldText formik={formik}
                                       id="newAgencyId"
                                       placeholder="New Agency ID"
                                       label="New Agency ID"
                                       numeric
                            />
                        </div>
                        <div className="row submit-holder">
                            <div className="field">
                                <div className="inner">
                                    <button type="submit" className="button">
                                        Change Agency
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default AgentChangeAgency;