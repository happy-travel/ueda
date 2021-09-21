import React from 'react';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import confirmationModal from 'matsumoto/src/components/confirmation-modal';
import ConfirmationMedium from '../../components/confirms/confirmation-medium';
import PermissionsSelectorElement from 'matsumoto/src/pages/cabinet/agency/parts/permission-selector-element';


const AgentChangeAgency = observer(({ id, agentId }) => {

    const changeAgency = (values) => {
        confirmationModal(ConfirmationMedium).then(
            (onClose) => {
                API.post({
                    url: apiMethods.agentChangeAgency(id, agentId),
                    body: {
                        targetAgency: Number(values.newAgencyId),
                        roleIds: Object
                            .keys(values.roleIds)
                            .map((key) => values.roleIds[key] ? parseInt(key) : false)
                            .filter((item) => item)
            } ,
                    success: () => {
                        Notifications.addNotification('Changed', null, 'success');
                        onClose();
                    }
                })
            }
        )
    }

    return (
        <div className="block list">
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
                        <div className="cabinet">
                            <PermissionsSelectorElement
                                formik={formik}
                                rolesList={$auth.rolesCompleteList}
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
});

export default AgentChangeAgency;