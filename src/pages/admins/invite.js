import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { Loader } from 'matsumoto/src/components/simple';
import { CachedForm, FieldText } from 'matsumoto/src/components/form';
import FormAgentData from 'matsumoto/src/parts/form-agent-data';
import PermissionsSelectorElement from 'matsumoto/src/pages/cabinet/agency/parts/permission-selector-element';
import { registrationAgentValidatorWithEmail } from 'matsumoto/src/components/form/validation';
import $auth from 'stores/auth';
import confirmationModal from 'components/confirmation-modal';
import confirmation from '../../components/confirms/confirmation-medium';

const inviteAdminPage = observer(() => {
    const [success, setSuccess] = useState(false);

    const submit = (values) => {
        confirmationModal(confirmation).then(
            () => {
                setSuccess(null);
                API.post({
                    url: apiMethods.adminSendInvitation,
                    body: {
                        registrationInfo: {
                            title: values.title,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            position: values.position,
                            email: values.email
                        },
                        roleIds: Object
                            .keys(values.roleIds)
                            .map((key) => values.roleIds[key] ? parseInt(key) : false)
                            .filter((item) => item)
                    },
                    success: () => {setSuccess(true)},
                });
            }
        )
    };

    return (
        <div className="settings block page-content-no-tabs">
            <h1><span className="brand">Invite Administrator</span></h1>
            { success === null && <Loader /> }
            { success && <div>
                {success === true &&
                    <div>
                        <h3>Your invitation sent</h3>
                    </div>
                }
            </div> }

            { false === success && <CachedForm
                validationSchema={registrationAgentValidatorWithEmail}
                onSubmit={submit}
                render={(formik) => (
                    <React.Fragment>
                        <div className="form section-slim">
                            <div className="row">
                                <FieldText formik={formik}
                                           id="email"
                                           label="Email"
                                           placeholder="Email"
                                           required
                                />
                            </div>
                            <FormAgentData formik={formik} t={(x)=>x}/>
                            <div className="cabinet">
                                <PermissionsSelectorElement
                                    formik={formik}
                                    rolesList={$auth.rolesCompleteList}
                                />
                            </div>
                            <div className="row submit-holder">
                                <div className="field">
                                    <div className="inner">
                                        <button className="button" onClick={formik.handleSubmit}>
                                            Send Invitation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            />}
        </div>
    );
});

export default inviteAdminPage;
