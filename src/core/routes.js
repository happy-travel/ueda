import React from 'react';
import { Switch } from 'react-router-dom';
import notFoundPage from 'matsumoto/src/pages/common/not-found-page';
import acceptInvite from 'matsumoto/src/pages/signup/accept-invite';
import Route from './misc/route';
import mainPage from 'pages/main';
import counterpartiesListPage from 'pages/counterparties/list';
import counterpartiesItemPage from 'pages/counterparties/counterparty';
import agencyPage from 'pages/agency/agency';
import agentPage from 'pages/agents/agent';
import createPaymentLinkPage from 'pages/paymentlinks/create';
import adminsPage from 'pages/admins/admins';
import duplicatesListPage from 'pages/duplicates/list';
import globalMarkupsPage from 'pages/global-markups/global-markups';
import duplicatePage from 'pages/duplicates/duplicate';
import bookingPage from 'pages/bookings/booking';
import bookingsPage from 'pages/bookings/bookings-page';
import reportsPage from 'pages/reports/reports';
import counterPartyTransferBalancePage from 'pages/counterparties/counterparty-transfer-balance-info';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path={[
            '/agency/:id/agents/:agentId/booking/:refCode',
            '/agency/:id/booking/:refCode',
            '/booking/:refCode'
        ]} component={bookingPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/:id/transfer-balance" component={counterPartyTransferBalancePage} />
        <Route path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route path="/agency/:id/agents/:agentId" component={agentPage} />
        <Route path="/agency/:id" component={agencyPage} />
        <Route exact path="/paymentlinks" component={createPaymentLinkPage} />
        <Route exact path="/duplicates/:id" component={duplicatePage} />
        <Route exact path="/duplicates" component={duplicatesListPage} />
        <Route exact path="/globalmarkups" component={globalMarkupsPage} />
        <Route path="/signup/invite/:email/:code" component={acceptInvite} title="Sign Up" />
        <Route exact path="/reports" component={reportsPage} />
        <Route path="/admins" component={adminsPage} />
        <Route exact path="/bookings" component={bookingsPage} />
        <Route component={notFoundPage} />
    </Switch>
);

export default Routes;

