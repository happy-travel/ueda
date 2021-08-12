import React from 'react';
import ReportCard from './report-card';



const urlMethods = {
    supplier: 'supplierConnectivityReport',
    agency: 'agencyConnectivityReport',
    agencyProductivity: 'agencyProductivityReport',
    fullBooking: 'fullBookingsReport'
}

const ReportsPage = () => (
    <div className="block page-content-no-tabs reports-list">
        <h1>Download report</h1>
        <ReportCard>
            {urlMethods.supplier}
            <h3>Direct Connectivity Supplier Wise Report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agency}
            <h3>Direct Connectivity Agency Wise Report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agencyProductivity}
            <h3>Agencies Productivity Report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.fullBooking}
            <h3>Full Bookings Report</h3>
        </ReportCard>
    </div>
)

export default ReportsPage;
