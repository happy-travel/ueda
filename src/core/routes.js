import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'matsumoto/src/core/misc/route';
import notFoundPage from 'matsumoto/src/pages/common/not-found-page';
import acceptInvite from 'matsumoto/src/pages/signup/accept-invite';
import mainPage from 'pages/main';
import counterpartiesListPage from 'pages/counterparties/list';
import counterpartiesItemPage from 'pages/counterparties/counterparty';
import agencyPage from 'pages/agency/agency';
import agencyBalancePage from 'pages/agency/agency-balance';
import agencySettingsPage from 'pages/agency/agency-settings';
import agencyListPage from 'pages/agency/list';
import agencyBookingPage from 'pages/agency/agency-bookings';
import agentPage from 'pages/agents/agent';
import createPaymentLinkPage from 'pages/paymentlinks/create';
import inviteAdminPage from 'pages/admins/invite';
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
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/:id/transfer-balance" component={counterPartyTransferBalancePage} />
        <Route path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route exact path="/agency/:id/transfer-balance" component={agencyBalancePage} />
        <Route exact path="/agency/:id/settings" component={agencySettingsPage} />
        <Route exact path="/agency/:id/agents" component={agencyListPage} />
        <Route exact path="/agency/:id/bookings" component={agencyBookingPage} />
        <Route exact path="/agency/:id" component={agencyPage} />
        <Route path="/agency/:id/agents/:agentId" component={agentPage} />
        <Route exact path="/paymentlinks" component={createPaymentLinkPage} />
        <Route exact path="/admins" component={inviteAdminPage} />
        <Route exact path="/duplicates/:id" component={duplicatePage} />
        <Route exact path="/duplicates" component={duplicatesListPage} />
        <Route exact path="/globalmarkups" component={globalMarkupsPage} />
        <Route path="/signup/invite/:email/:code" component={acceptInvite} title="Sign Up" />
        <Route exact path="/reports" component={reportsPage} />
        <Route exact path={[
            '/counterparties/agencies/booking/:refCode',
            '/counterparties/agencies/:id/booking/:refCode',
            '/agency/:id/booking/:refCode'
        ]} component={bookingPage} />
        <Route exact path="/bookings" component={bookingsPage} />
        <Route component={notFoundPage} />
    </Switch>
);

export default Routes;

