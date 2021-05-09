import React, { createContext } from 'react';
import LoaderState from '../../Loader/LoaderState';
import ToastState from '../../Toaster/ToastState';
import DialogState from './DialogState';

export const AppContext = createContext();

export const CommonModals = {
    ChangePassword: 'ChangePassword',
    ForgotPassword: 'ForgotPassword',
    ResetPassword: 'ResetPassword',
    GenericModal: 'GenericModal',
}

export const AppContextProvider = props => {
    let loaderState = LoaderState();
    let toastState = ToastState();
    let dialogState = DialogState();

    return <AppContext.Provider value={{ loaderState, toastState, dialogState }}>
        <>
            {props.children}
        </>
    </AppContext.Provider>
}