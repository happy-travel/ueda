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
import counterPartyTransferBalanceAccountOperationsPage from 'pages/counterparties/counterparty-transfer-balance-account-operations';
import counterPartyTransferBalanceActionsPage from 'pages/counterparties/counterparty-transfer-balance-actions';
import counterPartyMarkupManagerPage from 'pages/counterparties/counterparty-markup-manager';
import counterPartyAgenciesPage from 'pages/counterparties/counterparty-agencies';
import counterpartyDetailsPage from 'pages/counterparties/counterparty-details';
import counterpartyContractPage from 'pages/counterparties/counterparty-contract';
import counterpartyVerificationPage from 'pages/counterparties/counterparty-verification';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={mainPage} />
        <Route exact path="/counterparties" component={counterpartiesListPage} />
        <Route exact path="/counterparties/:id/transfer-balance/account-operations" component={counterPartyTransferBalanceAccountOperationsPage} />
        <Route exact path="/counterparties/:id/transfer-balance" component={counterPartyTransferBalancePage} />
        <Route exact path="/counterparties/:id/transfer-balance/actions" component={counterPartyTransferBalanceActionsPage} />
        <Route exact path="/counterparties/:id/verification" component={counterpartyVerificationPage} />
        <Route exact path="/counterparties/:id/markup-manager" component={counterPartyMarkupManagerPage} />
        <Route exact path="/counterparties/:id/agencies" component={counterPartyAgenciesPage} />
        <Route exact path="/counterparties/:id/details" component={ counterpartyDetailsPage} />
        <Route exact path="/counterparties/:id/contract" component={ counterpartyContractPage} />
        <Route exact path="/counterparties/:id" component={counterpartiesItemPage} />
        <Route exact path="/counterparties/agencies/:id/transfer-balance" component={agencyBalancePage} />
        <Route exact path="/counterparties/agencies/:id/settings" component={agencySettingsPage} />
        <Route exact path="/counterparties/agencies/:id/agents" component={agencyListPage} />
        <Route exact path="/counterparties/agencies/:id/bookings" component={agencyBookingPage} />
        <Route exact path="/counterparties/agencies/:id" component={agencyPage} />
        <Route exact path="/counterparties/agencies/:id/agents/:agentId" component={agentPage} />
        <Route exact path="/paymentlinks" component={createPaymentLinkPage} />
        <Route exact path="/admins" component={inviteAdminPage} />
        <Route exact path="/duplicates/:id" component={duplicatePage} />
        <Route exact path="/duplicates" component={duplicatesListPage} />
        <Route exact path="/globalmarkups" component={globalMarkupsPage} />
        <Route path="/signup/invite/:email/:code" component={acceptInvite} title="Sign Up" />
        <Route exact path="/reports" component={reportsPage} />
        <Route exact path={[
            '/counterparties/agencies/booking/:refCode',
            '/counterparties/agencies/:id/booking/:refCode'
        ]} component={bookingPage} />
        <Route exact path="/bookings" component={bookingsPage} />
        <Route component={notFoundPage} />
    </Switch>
);

export default Routes;

