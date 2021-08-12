import React, { useState, useEffect } from 'react';
import { CachedForm, FieldCheckbox, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import { API } from 'matsumoto/src/core';
import apiMethods from 'core/methods';

const SearchOptionsForm = ({ id }) => {
    const [settings, setSettings] = useState(null);
    const [defaultSettings, setDefaultSettings] = useState(true);

    useEffect(() => {
        if (id) {
            API.get({
                url: apiMethods.availabilitySearchOptions(id),
                success: (settings) => {
                    setSettings(settings);
                }
            });
        }
    }, [])

    const submitSettings = (values) => {
        if(defaultSettings) {
            API.put({
                url: apiMethods.availabilitySearchOptions(id),
                body: values,
            });
        } else {
            API.delete({
                url: apiMethods.availabilitySearchOptions(id),
            });
        }
    }

    const changeHandler = (value) => {
        setDefaultSettings(value)
    }

    return (
        <div style={{ marginBottom: '50px' }}>
            {settings?.enabledSuppliers &&
            <CachedForm
                initialValues={settings}
                onSubmit={submitSettings}
                render={(formik) => (
                    <div className="form">
                        <h1>Agency Settings</h1>
                        <div className="row">
                            <FieldCheckbox
                                formik={formik}
                                id="defaultSettings"
                                value={defaultSettings}
                                onChange={changeHandler}
                                label="Default settings"
                            />
                        </div>
                        {!defaultSettings &&
                        <div className="row double">
                            <div style={{ marginRight: '300px' }} className="modes">
                                <h1>Apr Mode</h1>
                                <div className="row">
                                    <FieldSelect formik={formik}
                                                 id="AprMode"
                                                 label="Apr Mode"
                                                 options={[
                                                     { value: 'Hide', text: 'Hide' },
                                                     { value: 'DisplayOnly', text: 'Display Only' },
                                                     { value: 'CardPurchasesOnly', text: 'Card Purchases Only' },
                                                     { value: 'CardAndAccountPurchases', text: 'Card And Account Purchases' }
                                                 ]}
                                    />
                                </div>
                                <h1>Passed Deadline Offers Mode</h1>
                                <div className="row">
                                    <FieldSelect formik={formik}
                                                 id="PassedDeadlineOffersMode"
                                                 label="Passed Deadline Offers Mode"
                                                 options={[
                                                     { value: 'Hide', text: 'Hide' },
                                                     { value: 'DisplayOnly', text: 'Display Only' },
                                                     { value: 'CardPurchasesOnly', text: 'Card Purchases Only' },
                                                     { value: 'CardAndAccountPurchases', text: 'Card And Account Purchases' }
                                                 ]}
                                    />
                                </div>
                                <div className="row">
                                    <FieldText
                                        formik={formik}
                                        id="customDeadlineShift"
                                        label="Сustom Deadline Shift"
                                        maxLength={2}
                                        numeric
                                    />
                                </div>
                            </div>
                            <div className="suppliers">
                                <h1>Enabled suppliers</h1>
                                {Object.entries(settings.enabledSuppliers).map(([key, value]) => {
                                    return (
                                        <div className="row">
                                            <FieldCheckbox
                                                formik={formik}
                                                id="enabledSuppliers.Columbus"
                                                label={key}
                                            />
                                        </div>
                                    )
                                })}
                                <div className="row">
                                    <FieldCheckbox
                                        formik={formik}
                                        id="enabledSuppliers.IsDirectContractFlagVisible"
                                        value={settings?.isDirectContractFlagVisible}
                                        label="Direct Contract Flag View"
                                    />
                                </div>
                                <div className="row">
                                    <FieldCheckbox
                                        formik={formik}
                                        id="enabledSuppliers.IsMarkupDisabled"
                                        value={settings?.isMarkupDisabled}
                                        label="Markup Disabled"
                                    />
                                </div>
                                <div className="row">
                                    <FieldCheckbox
                                        formik={formik}
                                        id="supplierVisible"
                                        value={settings?.isSupplierVisible}
                                        label="Supplier Visible View"
                                    />
                                </div>
                            </div>
                        </div>}
                        <div
                            className="row submit-holder"
                            style={{
                            marginTop: '50px',
                                width: '33%',
                            }}
                            >
                            <div className="field">
                                <div className="inner">
                                    <button type="submit" className="button size-medium">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />}
        </div>
    )
}

export default SearchOptionsForm;
