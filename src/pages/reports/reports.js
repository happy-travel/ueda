import React from 'react';
import ReportCard from './report-card';



const urlMethods = {
    supplier: 'supplierConnectivityReport',
    agency: 'agencyConnectivityReport',
    agencyProductivity: 'agencyProductivityReport',
    fullBooking: 'fullBookingsReport'
}

const ReportsPage = () => (
    <div className="page-content-no-tabs reports-list">
        <h1>Download report</h1>
        <ReportCard>
            {urlMethods.supplier}
            <h3>Direct connectivity supplier wise report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agency}
            <h3>Direct connectivity agency wise report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.agencyProductivity}
            <h3>Agencies productivity report</h3>
        </ReportCard>
        <ReportCard>
            {urlMethods.fullBooking}
            <h3>Full bookings report</h3>
        </ReportCard>
    </div>
)

export default ReportsPage;
