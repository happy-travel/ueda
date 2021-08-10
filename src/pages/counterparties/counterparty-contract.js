import React, { useState, useEffect } from 'react';
import CounterpartyNavigation from './counterparty-navigation';
import NoteCard from 'parts/note';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const CounterpartyContract = ({ match }) => {
    let [counterparty, setCounterparty] = useState(null);

    useEffect(() => {
        API.get({
            url: apiMethods.counterparty(match.params.id),
            success: (counterparty) => {
                setCounterparty(counterparty)
            }
        });
    }, []);

    const uploadContract = (e) => {
        e.preventDefault();
        API.put({
            url: apiMethods.contractFile(match.params.id),
            formDataBody: new FormData(document.getElementById('formElem')),
            success: () => setCounterparty({ ...counterparty,
                isContractUploaded: true })
        });
    }

    const downloadContract = () => {
        API.get({
            url: apiMethods.contractFile(match.params.id),
            response: (res) => {
                res.blob().then((blobby) => {
                    var anchor = document.createElement('a');
                    document.body.appendChild(anchor);

                    var objectUrl = window.URL.createObjectURL(blobby);
                    anchor.href = objectUrl;
                    anchor.download = 'contract.pdf';
                    anchor.click();

                    window.URL.revokeObjectURL(objectUrl);
                });
            }
        })
    }

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <div className="admin-tab-element-wrapper block">
                <h2>Contract</h2>
                <div className="section-slim">
                    <NoteCard>
                    Lorem Ipsum is simply dummy text of the ' +
                    'printing and typesetting industry. Lorem Ipsum has been the industry\'s' +
                    ' standard dummy text ever since the 1500s, when an unknown printer took a ' +
                    'galley of type and scrambled it to make a type specime
                    </NoteCard>
                    <div className="buttons tool-bar">
                        <div className="vertical-toolbar-element">
                            <form id="formElem" onSubmit={uploadContract}>
                                <label className="button size-large file-upload">
                                    {counterparty?.isContractUploaded ? 'Upload Another Contract' : 'Upload Contract'}
                                    <input type="file" name="file" accept="application/pdf"
                                           onChange={uploadContract}/>
                                </label>
                            </form>
                        </div>
                        <div className="vertical-toolbar-element">
                            {counterparty?.isContractUploaded &&
                            <button className="button size-large file-upload" onClick={downloadContract}>
                                Download Contract
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CounterpartyContract;