import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { getInvite, forgetInvite } from 'matsumoto/src/tasks/signup/invitation';
import { API, redirect } from 'matsumoto/src/core';
import apiMethods from 'core/methods';
import { $notifications } from 'matsumoto/src/stores';
import $auth from 'stores/auth';
import WelcomePicture from '../../styles/images/Group.png'


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
            <div className="welcome-block">
                <span>
                    <h2>
                    Hello {($auth.information?.firstName || '') + ' ' + ($auth.information?.lastName || '')}
                    </h2>
                    <div>
                        Welcome to Happy Travel
                    </div>
                </span>
                <img src={WelcomePicture} alt=""/>
            </div>
            <div className="entitlement">
                <span>
                    <h2>Entitlements</h2>
                    <div>
                    About Us
                    Offering premier destinations for the world’s most discerning travellers
                    Happy Travel & Tourism is a luxury b2b global travel wholesaler.
                    Headquartered in Dubai, United Arab Emirates,
                    Happy Travel and Tourism also has offices in Saudi Arabia and Russia and sales representation in Europe and Mexico.
                    Upcoming plans include expansion in Europe and LATAM and further sales representations in India and China.
                </div>
                </span>
            </div>

            {/*<section>*/}
            {/*    <h1>Welcome</h1>*/}
            {/*    { $auth.hasRole('Accounts manager') &&*/}
            {/*        <div>You have <b>Accounts manager</b> role.</div>*/}
            {/*    }*/}
            {/*    { $auth.hasRole('Booking manager') &&*/}
            {/*        <div>You have <b>Booking manager</b> role.</div>*/}
            {/*    }*/}
            {/*    { $auth.hasRole('Auditor') &&*/}
            {/*        <div>You have <b>Auditor</b> role.</div>*/}
            {/*    }*/}
            {/*    { $auth.hasRole('Accommodation duplicates corrector') &&*/}
            {/*        <div>You have <b>Accommodation duplicates corrector</b> role.</div>*/}
            {/*    }*/}
            {/*    { $auth.hasRole('Company administrator') &&*/}
            {/*        <div>You have <b>Company administrator</b> role.</div>*/}
            {/*    }*/}
            {/*    { $auth.hasRole('Test role') &&*/}
            {/*        <div>You have <b>Test role</b> role.</div>*/}
            {/*    }*/}
            {/*</section>*/}
        </div>
    );
});

export default UedaMainPage;
