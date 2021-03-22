import React, { useContext, useMemo } from 'react';
import { NavLink, Route, Switch } from "react-router-dom";
import { menu, TypeOfAuth } from "./_menu";
import AppContext from "../../App/AppContext"
import moment from 'moment'
export let Navbar = props => {
    const { loggedIn, displayName, lastLogin, portalSettings, showModal } = useContext(AppContext);
    const currentMenus = useMemo(()=>{
        return menu        
        .filter(m=> m.authType === TypeOfAuth.Both || m.authType === (loggedIn ? TypeOfAuth.Auth : TypeOfAuth.NonAuth));
    }, [loggedIn])

    const showPasswordChangeModal = e=>{
        e.preventDefault();
        showModal('PasswordChange')
    }    
    return <>
            <div className="navbar" style={{backgroundColor:portalSettings.menubarBackgroundColor, color: portalSettings.menubarTextColor}}>                
                <ul>
                    {currentMenus.filter(m=>!m.hidden).map((m, i) => {
                        return (
                            <li key={i}>
                                <NavLink
                                    exact={m.exact}
                                    activeClassName="active-link"
                                    to={m.path.toLowerCase()}
                                >
                                    {m.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                {loggedIn &&  <ul className="pull-right">
                        {lastLogin && <li><label className="last-login">Last Login:{moment(lastLogin).format('LLL')}</label></li>}
                        <li>
                            <a href="#" onClick={showPasswordChangeModal}>{displayName}</a>                            
                        </li>
                    </ul>
                }
                
            </div>
            <Switch>
                {currentMenus.map((m) => {
                    return (
                        <Route
                            key={m.path}
                            exact={m.exact}
                            path={m.path.toLowerCase()}
                            component={m.component}
                        ></Route>
                    );
                })}
            </Switch>
        </>
};
