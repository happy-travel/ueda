import React from 'react';

const ConfirmationMedium = ({ yes, no, children }) => {
    return (
        <div className="confirmation-modal confirm-medium">
            <div className="icon-wrapper">
                <i className="icon icon-warning"/>
            </div>
            <div className="confirm-content">
                <div className="text-space">
                    <h3>Are you sure?</h3>
                    <div>{children || 'Null'}</div>
                </div>
                <div className="confirm-actions">
                    <div onClick={no}>Cancel</div>
                    <div className="accept" onClick={yes}>Confirm</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationMedium;