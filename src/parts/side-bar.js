import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <nav className="side-bar">
            <div className="content">
                <Link to="/counterparties">
                    <div className="sidebar-item">
                        <i className="icon icon-counterparty"/>
                        <span>Counterparties</span>
                    </div>
                </Link>
                <Link to="/paymentlinks">
                    <div className="sidebar-item">
                        <i className="icon icon-payment-links"/>
                        <span>Payment Links</span>
                    </div>
                </Link>
                <Link to="/admins">
                    <div className="sidebar-item">
                        <i className="icon icon-admins"/>
                        <span>Admins</span>
                    </div>
                </Link>
                <Link to="/duplicates">
                    <div className="sidebar-item">
                        <i className="icon icon-duplicates"/>
                        <span>Duplicates</span>
                    </div>
                </Link>
                <Link to="/globalmarkups">
                    <div className="sidebar-item">
                        <i className="icon icon-markups"/>
                        <span>Markups</span>
                    </div>
                </Link>
                <Link to="/reports">
                    <div className="sidebar-item">
                        <i className="icon icon-reports"/>
                        <span>Reports</span>
                    </div>
                </Link>
                <Link to="/bookings">
                    <div className="sidebar-item">
                        <i className="icon icon-bookings"/>
                        <span>Bookings</span>
                    </div>
                </Link></div>
        </nav>
    )
}

export default SideBar;