import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import $auth from 'stores/auth';

const SideBar = observer(() => {
    return (
        <nav className="side-bar">
            {($auth.permitted('CounterpartyBalanceObservation') ||
              $auth.permitted('CounterpartyBalanceReplenishAndSubtract') ||
              $auth.permitted('CounterpartyToAgencyTransfer') ||
              $auth.permitted('CounterpartyManagement')) &&
              <Link to="/counterparties">
                  <div className="sidebar-item">
                      <i className="icon icon-counterparty" />
                      <span>Counterparties</span>
                  </div>
              </Link>}
            {$auth.permitted('PaymentLinkGeneration') &&
            <Link to="/paymentlinks">
                <div className="sidebar-item">
                    <i className="icon icon-payment-links" />
                    <span>Payment Links</span>
                </div>
            </Link>}
            {$auth.permitted('AdministratorInvitation') &&
            <Link to="/admins">
                <div className="sidebar-item">
                    <i className="icon icon-admins" />
                    <span>Admins</span>
                </div>
            </Link>}
            {$auth.permitted('AccommodationDuplicatesReportApproval') &&
            <Link to="/duplicates">
                <div className="sidebar-item">
                    <i className="icon icon-duplicates" />
                    <span>Duplicates</span>
                </div>
            </Link>
            }
            {$auth.permitted('MarkupManagement') &&
            <Link to="/globalmarkups">
                <div className="sidebar-item">
                    <i className="icon icon-markups" />
                    <span>Markups</span>
                </div>
            </Link>}
            {($auth.permitted('BookingReportGeneration') ||
              $auth.permitted('AccountsReportGeneration') ||
              $auth.permitted('CompanyReportGeneration')) &&
            <Link to="/reports">
                <div className="sidebar-item">
                    <i className="icon icon-reports" />
                    <span>Reports</span>
                </div>
            </Link>}
            {$auth.permitted('BookingManagement') &&
            <Link to="/bookings">
                <div className="sidebar-item">
                    <i className="icon icon-bookings" />
                    <span>Bookings</span>
                </div>
            </Link>}
        </nav>
    )
});

export default SideBar;