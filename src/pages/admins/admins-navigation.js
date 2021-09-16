import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminsNavigation = () => {
    return (
        <div>
            <div className="tabs-navigation">
                <NavLink to={'/admins/list'}>
                    Administrators list
                </NavLink>
                <NavLink to={'/admins/invitation-list'}>
                    Invitations list
                </NavLink>
                <NavLink to={'/admins/invite'}>
                    Send Invitation
                </NavLink>
            </div>
        </div>
    )
}

export default AdminsNavigation;