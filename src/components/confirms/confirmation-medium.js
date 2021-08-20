import React from 'react';

const ConfirmationMedium = ({ yes, no, children }) => {
    return (
        <div className="confirmation-modal confirm-cancel">
            <div className="icon-wrapper">
                <i className="icon icon-warning"/>
            </div>
            <div>
                <h3>Are you sure?</h3>
                <div>{children}</div>
                <div className="confirm-actions">
                    <div onClick={no}>Cancel</div>
                    <div className="accept" onClick={yes}>Confirm</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationMedium;