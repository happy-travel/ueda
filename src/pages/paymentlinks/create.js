import React, { useState, useEffect } from 'react';
import { API } from 'matsumoto/src/core';
import { CachedForm, FieldText, FieldSelect, FieldTextarea } from 'matsumoto/src/components/form';
import apiMethods from 'core/methods';
import { copyToClipboard } from 'matsumoto/src/simple/logic';
import { ValidatorPaymentLink } from 'components/form/validation/validator-payment-link';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CreatePaymentLinkPage = () => {
    const [result, setResult] = useState(null);

    const submit = (values) => {
        API.post({
            url: values.send
                    ? apiMethods.createPaymentLinkAndSend
                    : apiMethods.createPaymentLink,
            body: {
                ...values,
                amount: parseFloat(values.amount)
            },
            success: (result = true) => {
                setResult(result)
                Notifications.addNotification(`${values.send ? 'Email was sent' : 'Link was generated'}`, null, 'success')
            },
        });
    }

    const submitButtonClick = (event, send, formik) => {
        event.preventDefault();
        formik.setFieldValue('send', send);
        formik.handleSubmit();
    }


    if (result === true)
        return (
            <div className="block">
                <section>
                    <div>
                        <div className="form">
                            <h1>Successfully sent</h1>
                        </div>
                    </div>
                    <button className="button payment-back" onClick={() => setResult(null)}>
                        Create one more payment link
                    </button>
                </section>
            </div>
        );

    if (result)
        return (
            <div className="block page-content-no-tabs payment-link">
                <h1 className="no-tabs-header">Payment link generated</h1>
                <div className="form">
                    <div className="row-group">
                        <div className="row wide">
                            <FieldText
                                readonly
                                value={result}
                            />
                        </div>
                        <div className="row slim">
                            <button className="button small" onClick={() => copyToClipboard(result)}>
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
                <button className="button payment-back" onClick={() => setResult(null)}>
                    Create one more payment link
                </button>
            </div>
        );

    return (
        <div className="settings block">
            <div className="page-content-no-tabs">
                <h1 className="no-tabs-header">Create a payment link</h1>
                <CachedForm
                    onSubmit={submit}
                    validationSchema={ValidatorPaymentLink}
                    render={(formik) => (
                        <div className="form section-slim">
                            <div className="row">
                                <FieldText formik={formik}
                                           placeholder="Please Enter Amount" id="amount"
                                           label="Amount" numeric required/>
                            </div>
                            <div className="row">
                                <FieldText formik={formik} placeholder="Please Enter Email"
                                           id="email"
                                           label="Email" required/>
                            </div>
                            <div className="row">
                                <FieldSelect formik={formik}
                                             placeholder="Please Choose the Type of a Service"
                                             id="serviceType"
                                             label="Service Type"
                                             options={[
                                                 { value: 'HTL', text: 'HTL' },
                                                 { value: 'TRN', text: 'TRN' },
                                                 { value: 'CMS', text: 'CMS' }
                                             ]}
                                />
                            </div>
                            <div className="row currency">
                                <FieldSelect formik={formik}
                                             placeholder="Please Choose Currency"
                                             id="currency"
                                             label="Currency"
                                             options={[
                                                 { value: 'USD', text: 'USD' },
                                                 { value: 'AED', text: 'AED' },
                                                 { value: 'SAR', text: 'SAR' }
                                             ]}
                                             required
                                />
                            </div>
                            <div className="row">
                                <FieldTextarea formik={formik}
                                               placeholder="Please Enter Commentary"
                                               id="comment"
                                               label="Commentary"
                                               required
                                />
                            </div>
                            <div className="row submit-holder">
                                <div className="field">
                                    <div className="inner">
                                        <button
                                            onClick={(e) => submitButtonClick(e, false, formik)}
                                            className={`button ${!formik.isValid && 'disabled'}`}
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="inner">
                                        <button
                                            onClick={(e) => submitButtonClick(e, true, formik)}
                                            className={`button ${!formik.isValid && 'disabled'}`}
                                        >
                                            Send by Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default CreatePaymentLinkPage;
