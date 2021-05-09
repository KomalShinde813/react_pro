const storage = localStorage;

const getName = () => storage.getItem( '_displayName_' );
const getToken = () => storage.getItem( '_token_' );
const getLastLogin = () => storage.getItem( '_lastLogin_' );
const getUserRoles = () => ( storage.getItem( '_userRoles_' ) || '' ).split( ',' );
const loginInfoUpdatedAt = () => storage.getItem( '_login_info_updated_at_' );

const getPortalSetting = () => {
  const setting = storage.getItem( '_portal_setting_' );
  if ( setting ) {
    return JSON.parse( setting );
  }
  return setting;
}

const setPortalSetting = setting => {
  storage.setItem( '_portal_setting_', JSON.stringify( setting ) );
}

export const AppStorage = {
  getItem: storage.getItem,
  setItem: storage.setItem,
  removeItem: storage.removeItem,
  getName,
  getToken,
  getLastLogin,
  getUserRoles,
  loginInfoUpdatedAt,
  getPortalSetting,
  setPortalSetting,
  isLoggedIn: () => !!getName() && !!getToken(),
  performLogin: ( { data } ) => {
    storage.setItem( '_token_', data.token );
    storage.setItem( '_displayName_', data.displayName );
    storage.setItem( '_lastLogin_', data.lastLogin );
    storage.setItem( '_userRoles_', data.roles );
    storage.setItem( '_login_info_updated_at_', Date.now() );
  },
  performLogout: () => {
    const portalSetting = getPortalSetting();
    storage.clear();
    if ( portalSetting ) {
      setPortalSetting( { ...portalSetting, expired: true } );
    }
    storage.setItem( '_login_info_updated_at_', Date.now() );
  }
}