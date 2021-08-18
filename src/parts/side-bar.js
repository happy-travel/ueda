import React, { useState } from 'react';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideBarItem from './side-bar-item';


const SideBar = observer(() => {
    const [select, setSelect] = useState(false);

    const selectHandler = () => {
        console.log(select);
        setSelect(!select)
    };

    return (
        <nav className="side-bar">
            <div className="content">
                {($auth.permitted('CounterpartyBalanceObservation') ||
                    $auth.permitted('CounterpartyBalanceReplenishAndSubtract') ||
                    $auth.permitted('CounterpartyToAgencyTransfer') ||
                    $auth.permitted('CounterpartyManagement')) &&
                <SideBarItem url={'/counterparties'}>
                    <i className="icon icon-counterparty" />
                    <span>Counterparties</span>
                </SideBarItem>}
                {$auth.permitted('PaymentLinkGeneration') &&
                <SideBarItem url={'/paymentlinks'}>
                    <i className="icon icon-payment-links" />
                    <span>Payment Links</span>
                </SideBarItem>}
                {$auth.permitted('AdministratorInvitation') &&
                <SideBarItem url={'/admins'}>
                    <i className="icon icon-admins" />
                    <span>Administrators</span>
                </SideBarItem>}
                {$auth.permitted('AccommodationDuplicatesReportApproval') &&
                <SideBarItem url={'/duplicates'}>
                    <i className="icon icon-duplicates" />
                    <span>Duplicates</span>
                </SideBarItem>}
                {$auth.permitted('MarkupManagement') &&
                <SideBarItem url={'/globalmarkups'}>
                    <i className="icon icon-markups" />
                    <span>Markups</span>
                </SideBarItem>}
                {($auth.permitted('BookingReportGeneration') ||
                    $auth.permitted('AccountsReportGeneration') ||
                    $auth.permitted('BookingManagement') ||
                    $auth.permitted('CompanyReportGeneration')) &&
                <SideBarItem url={'/reports'}>
                    <i className="icon icon-reports" />
                    <span>Reports</span>
                </SideBarItem>}
            </div>
        </nav>
    )
});

export default SideBar;