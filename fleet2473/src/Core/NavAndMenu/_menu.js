import {
  authMenu,
  unAuthMenu,
  adminMenu,
  internalMenu
} from './menu'
import * as Components from "./../../Components";
import { TypeOfAuth } from './menu/menu-auth-type'

export const getMenuForRole = ( roles, isLoggedIn ) => {
  let menus = [];
  if ( !isLoggedIn ) {
    menus.push( ...unAuthMenu );
  } else {
    roles.forEach( role => {
      switch ( role ) {
        case 'admin':
          menus.push( ...adminMenu );
          break;
        case 'internal':
          menus.push( ...internalMenu );
          break;
      }
    } );
    menus.push( ...authMenu );
  }

  if ( process.env.NODE_ENV !== 'production' ) {
    menus.push( {
      label: "ⓘ",
      path: "/help",
      component: Components.Help,
      authType: TypeOfAuth.Both,
    } )
  }
  return menus.filter( m => m.authType === TypeOfAuth.Both || m.authType === ( isLoggedIn ? TypeOfAuth.Auth : TypeOfAuth.NonAuth ) );
}