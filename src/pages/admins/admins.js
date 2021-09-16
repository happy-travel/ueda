import React from 'react';
import AdminsNavigation from './admins-navigation';
import { Route, Switch } from 'react-router-dom';
import InviteAdminPage from './invite';
import AdminListPage from './list';

const AdminsPage = () => {
    return (
        <div className="page-content admins">
            <h1>Administrators</h1>
            <AdminsNavigation />
            <Switch>
                <Route path={'/admins/list'}
                       render={() => <AdminListPage/>}/>
                <Route path={'/admins/invite'}
                       render={() => <InviteAdminPage/>}/>
            </Switch>
        </div>
    )
}

export default AdminsPage;