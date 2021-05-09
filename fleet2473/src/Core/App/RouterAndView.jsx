import { PhoneIphone, AccessTime, Email } from '@material-ui/icons';
import React, { useContext, useMemo } from 'react';
import { BrowserRouter, NavLink } from "react-router-dom";
import { usePortalSettings } from '../Hooks/usePortalSettings';
import { Navbar } from '../NavAndMenu/AppNavbar';
// import { Navbar } from '../Root/Navbar';

export const RouterAndView = props => {
    const portalSettings = usePortalSettings();
    const showTopNavAndMenu = true;
    const itemArray = useMemo(() => {
        return [
            { text: "Call US", value: portalSettings.callUs, icon: PhoneIphone },
            { text: "Opening Time", value: portalSettings.openingTime, icon: AccessTime },
            { text: "Email US", value: portalSettings.emailUs, icon: Email }
        ]
    }, [portalSettings]);
    return (
        <BrowserRouter>
            <div className="app">
                {showTopNavAndMenu &&
                    <div className="portal-info" style={{ backgroundColor: portalSettings.headerBackgroundColor, color: portalSettings.headerTextColor }}>
                        <NavLink to="/" className="branding-logo">
                            <img src={`${process.env.PUBLIC_URL}/${portalSettings.logo || 'header_logo.png'}`} />
                        </NavLink>
                        {
                            itemArray.map((c, i) => (
                                <div className="info" key={i}>
                                    <div className="icon">
                                        <c.icon fontSize="large" />
                                    </div>
                                    <div className="key-value">
                                        <label>
                                            {c.text}
                                        </label>
                                        <label className="value">
                                            {c.value}
                                        </label>
                                    </div>
                                </div>))
                        }
                    </div>
                }
                <Navbar portalSettings={portalSettings} />
            </div>
        </BrowserRouter>
    )
}