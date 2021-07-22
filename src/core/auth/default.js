import React, { useEffect } from 'react';
import Authorize from 'matsumoto/src/core/auth/authorize';
import { isPageAvailableAuthorizedOnly, Authorized } from 'core/auth';
import { initAdmin } from 'core/init';
import { Loader } from 'matsumoto/src/components/simple';

const AuthDefaultComponent = () => {
    useEffect(() => {
        if (Authorized())
            initAdmin();
        if (isPageAvailableAuthorizedOnly()) {
            Authorize.getUser().then((user) => {
                if (!user?.access_token)
                    Authorize.signinRedirect();
            });
            if (!Authorized())
                return <Loader white page />;
        }
    }, []);

    return null;
};

export default AuthDefaultComponent;
