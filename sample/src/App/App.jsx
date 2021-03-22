import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "./../Core/Header";
import AppContext from "./AppContext";
import { AppStorage } from "../Core/Service/storage-service";
import { Toast } from './../Core/Toast'
import { get } from "../Core/Service/http-calls";
import { ProfileModal } from "../Core/Modal";
function App() {    
    const portalSettings = AppStorage.getPortalSetting()||{expired: true};
    const [contextState, setContextState] = useState({
        loggedIn: AppStorage.isLoggedIn(),
        displayName: AppStorage.getName(),
        lastLogin: AppStorage.getLastLogin(),
        portalSettings: portalSettings,
        snackbar_open: false,
        snackbar_message: '',
        visibleModalId: '',
    });

    const showToast = msg=>{
        setContextState(st => ({ ...st, snackbar_open: true, snackbar_message: msg }))
    }

    const hideToast = () =>{
        setContextState(st => ({ ...st, snackbar_open: false, snackbar_message: null }))
    }

    const showModal = (modalId)=> {
        setContextState(st => ({ ...st, visibleModalId: modalId }))
    }

    const hideModal = ()=> {
        setContextState(st => ({ ...st, visibleModalId: '' }))
    }
    
    useEffect(() => {
        async function getPortalSetting(){        
            if(portalSettings.expired){
                const res = await get(`portalSetting/${window.location.host}`);
                if(res.data){
                    AppStorage.setPortalSetting(res.data);
                    setContextState(st=>({...st, portalSettings: AppStorage.getPortalSetting()}));
                }
            }
        }
        getPortalSetting();        
    }, []);    

    useEffect(() => {
        window.document.title = portalSettings.title || 'eWIP';
    }, [contextState.portalSettings]);
    return (
        <AppContext.Provider value={{ ...contextState, showToast, hideToast, hideModal, showModal }}>
            <div className="App">
                <Header />
            </div>
            <Toast />
            <ProfileModal />
        </AppContext.Provider>
    );
}

export default App;
