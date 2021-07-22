import { API, redirect } from 'matsumoto/src/core';
import apiMethods from './methods';
import $auth from 'stores/auth';

export const initAdmin = () => {
    if (window.location.href.includes('/auth'))
        return;

    API.get({
        url: apiMethods.adminCurrentAuth,
        success: (result) => {
            if (result?.isActive) {
                $auth.setInformation(result);
            } else {
                alert('You can`t login this panel with Agent`s account.');
                redirect('/logout');
            }
        },
        error: () => {
            $auth.setInformation(null);
            redirect('/logout');
        }
    });

    API.get({
        url: apiMethods.adminRoles,
        success: (result) => $auth.setRolesCompleteList(result)
    })
};
