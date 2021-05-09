import React from 'react';
import { NavLink, Route, Switch } from "react-router-dom";

import moment from 'moment'
import { useCurrentMenus } from '../Hooks/useMenu';
import { useLoginInfo } from '../Hooks/useLoginInfo';
import { Error404 } from './../../Components'

export let Navbar = ({ portalSettings }) => {
    const { isLoggedIn, displayName, lastLogin } = useLoginInfo()
    console.log('isLoggedIn', isLoggedIn);
    const currentMenus = useCurrentMenus();
    const showTopNavAndMenu = true;
    return <>
        { showTopNavAndMenu &&
            <div className="navbar" style={{ backgroundColor: portalSettings.menubarBackgroundColor, color: portalSettings.menubarTextColor }}>
                <ul>
                    {currentMenus.filter(m => !m.hidden).map((m, i) => {
                        return (
                            <li key={i}>
                                <NavLink
                                    exact={m.exact}
                                    activeClassName="active-link"
                                    to={m.path}
                                >
                                    {m.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                {isLoggedIn && <ul className="pull-right">
                    {lastLogin !== 'null' && <li><label className="last-login">Last Login: {moment(lastLogin).format('LLL')}</label></li>}
                    <li>
                        <a href="#">{displayName}</a>
                    </li>
                </ul>
                }

            </div>
        }
        <div className="component-container">
            <Switch>
                {currentMenus.map((m, i) => {
                    return (
                        <Route
                            key={i}
                            exact={m.exact}
                            path={m.path}
                            component={m.component}
                        ></Route>
                    );
                })}
                <Route component={Error404}>
                </Route>
            </Switch>
        </div>
    </>
};
