import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { getInvite, forgetInvite } from 'matsumoto/src/tasks/signup/invitation';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { $notifications } from 'matsumoto/src/stores';
import $auth from 'stores/auth';

const UedaMainPage = observer(() => {
    useEffect(() => {
        const invitationCode = getInvite();
        if (invitationCode) {
            API.post({
                url: apiMethods.adminRegister,
                body: invitationCode,
                success: () => {
                    forgetInvite();
                    $notifications.addNotification('Registered', null, 'success');
                    redirect('/');
                },
                error: () => {
                    forgetInvite();
                    $notifications.addNotification('Unable to accept invitation', null, 'warning');
                }
            });
        }
    }, []);

    return (
        <div className="block list page-content-no-tabs">
            <div className="title-page-block">
                <div className="background">
                    <h2>
                        Hi {($auth.information?.firstName || '') + ' ' + ($auth.information?.lastName || '')},
                    </h2>
                    <div>
                        Welcome to Happytravel.com Manage Panel!
                    </div>
                </div>
            </div>

            <div className="title-page-block">
                <h2>
                    You have next permissions
                </h2>
                <ul>
                    { $auth.hasRole('Accounts manager') &&
                        <li><b>Accounts manager</b> role</li>
                    }
                    { $auth.hasRole('Booking manager') &&
                        <li><b>Booking manager</b> role</li>
                    }
                    { $auth.hasRole('Auditor') &&
                        <li><b>Auditor</b> role</li>
                    }
                    { $auth.hasRole('Accommodation duplicates corrector') &&
                        <li><b>Accommodation duplicates corrector</b> role</li>
                    }
                    { $auth.hasRole('Company administrator') &&
                        <li><b>Company administrator</b> role</li>
                    }
                    { $auth.hasRole('Test role') &&
                        <li><b>Test role</b> role</li>
                    }
                </ul>
            </div>
        </div>
    );
});

export default UedaMainPage;
