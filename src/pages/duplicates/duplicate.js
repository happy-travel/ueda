import React from 'react';
import { API } from 'matsumoto/src/core';
import { date } from 'matsumoto/src/simple';
import apiMethods from 'core/methods';
import Notifications from 'matsumoto/src/stores/notifications-store';
import Verticaltable from '../vertical-table/vertical-table';
import HotelStars from 'matsumoto/src/components/accommodation/hotel-stars';
import ReactJson from 'react-json-view';
import confirmationModal from 'components/confirmation-modal';
import confirmCancel from '../../components/confirms/confirmation-medium';

class DuplicatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duplicate: {}
        };
    }

    componentDidMount() {
        API.get({
            url: apiMethods.duplicate(this.props.match.params.id),
            success: (duplicate) => this.setState({ duplicate })
        })
    }

    approve = () => {
        confirmationModal(confirmCancel).then(
            () => {
                API.post({
                    url: apiMethods.duplicateApprove(this.props.match.params.id),
                    success: () => Notifications.addNotification('Approved', null, 'success'),
                });
            }
        )
    }

    disapprove = () => {
        confirmationModal(confirmCancel).then(
            () => {
                API.post({
                    url: apiMethods.duplicateApprove(this.props.match.params.id),
                    success: () => Notifications.addNotification('Approved', null, 'success'),
                });
            }
        )
    }

    render() {
        const { duplicate } = this.state;
        const accommodationA = duplicate.accommodations?.[0];
        const accommodationB = duplicate.accommodations?.[1];
        const columns = [
            {
                title: 'Name',
                selector: 'name',
            },
            {
                title: 'Supplier',
                selector: 'source',
                formatter: (row) => (row.source)
            },
            {
                title: 'ID',
                selector: 'id',
            },
            {
                title: 'Emails',
                selector: 'contacts.emails',
            },
            {
                title: 'Phones',
                selector: 'contacts.phones',
                formatter: (row) => (row.data.contacts?.phones[0].replace(/-|\s/g,'')),
            },
            {
                title: 'Location',
                selector: 'location',
                formatter: (row) => (
                    <div>
                        {row.data.location.country}<br/>
                        {row.data.location.address}
                    </div>),
            },
            {
                title: 'Rating',
                selector: 'rating',
                formatter: ((row) => (
                    <HotelStars count={row.data.rating} />
                )),
                match: () => false

            },
            {
                title: 'Coordinates',
                selector: 'location',
                formatter: (row) => (
                    <div>
                        {row.data.location?.coordinates?.longitude.toFixed(6)}<br/>
                        {row.data.location?.coordinates?.latitude.toFixed(6)}
                    </div>),
                match: (a, b) => (
                    a.data.location?.coordinates?.longitude.toFixed(3)===
                    b.data.location?.coordinates?.longitude.toFixed(3) &&
                    a.data.location?.coordinates?.latitude.toFixed(3)===
                    b.data.location?.coordinates?.latitude.toFixed(3)
                ),

            },
            {
                title: 'Photos',
                formatter: (row) => (
                    <img
                    style={{ width: '300px' }}
                    src={ row.data.photos[0].sourceUrl }
                    alt={ row.data.photos[0].caption }
                    />),
                match: () => null,
            },
        ]

        return (
            <div className="settings block page-content-no-tabs">
                <h1>Duplicate #{this.props.match.params.id}</h1>
                <div className="buttons">
                    <button className="button" onClick={this.approve}>Approve</button>
                    <button className="button" onClick={this.disapprove}>Disapprove</button>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <strong>Created:</strong> {date.format.a(duplicate.created)}
                </div>
                <div>
                    <strong>Status:</strong> {duplicate.state}
                </div>
                { duplicate.agentName && <div>
                    <strong>Agent:</strong> {duplicate.agentName}
                </div> }
                {duplicate.accommodations &&
                    <Verticaltable dataA={accommodationA} dataB={accommodationB} columns={columns}/>
                }
                <div className={'raw-data'}>
                    <div>
                        <pre>
                            <h1>Accommodation A</h1>
                            <ReactJson src={accommodationA}
                                       theme="bright:inverted"
                                       collapsed={true}
                                       collapseStringsAfterLength={50}
                                       displayDataTypes={false}/>
                        </pre>
                    </div>

                    <div>
                        <pre>
                            <h1>Accommodation B</h1>
                             <ReactJson src={accommodationB}
                                        theme="bright:inverted"
                                        collapsed={true}
                                        collapseStringsAfterLength={50}
                                        displayDataTypes={false}/>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default DuplicatePage;
