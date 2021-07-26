import React from 'react';
import { CachedForm } from 'matsumoto/src/components/form';
import { date } from 'matsumoto/src/simple';
import FieldDatepicker from 'matsumoto/src/components/form/field-datepicker/field-datepicker';
import { API } from 'matsumoto/src/core';
import apiMethods from '../../core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';

const initialDateValues = {
    start: date.addMonth(new Date(), -1),
    end: new Date()
}

const ReportCard = ({ children }) => {

    const reportResponse = (res, values) => {
        if (res.status === 400)
            Notifications.addNotification('Couldn\'t download a report');
        if (res.status === 200)
            res.blob().then((blobby) => {
                let anchor = document.createElement('a');
                document.body.appendChild(anchor);

                const objectUrl = window.URL.createObjectURL(blobby);
                anchor.href = objectUrl;
                anchor.download = `report${values.start.toISOString()}${values.end.toISOString()}.csv`;
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }

    const downloadReport = (values) => {
        API.get({
            url: apiMethods[children[0]](values.start.toISOString(), values.end.toISOString()),
            response: (res) => reportResponse(res, values)
        })
    }

    return (
        <div className="report-card">
            <div>
                <CachedForm
                    initialValues={initialDateValues}
                    onSubmit={downloadReport}
                render={(formik) => (
                    <div className="report-period">
                        <div className="report-header">
                            {children[1]}
                            <button type="submit"><i className="icon icon-download"/></button>
                        </div>
                        <FieldDatepicker
                            className="size-one"
                            required
                            formik={ formik }
                            id="dates"
                            first="start"
                            second="end"
                            placeholder="Dates"
                        />
                    </div>
                )}/>
            </div>
        </div>
    )
}

export default ReportCard