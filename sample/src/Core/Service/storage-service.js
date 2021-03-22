const storage = localStorage;

const getName = ()=> storage.getItem('_displayName_');
const getToken = ()=> storage.getItem('_token_');
const getLastLogin = ()=> storage.getItem('_lastLogin_');
const getPortalSetting = ()=> {
    const setting = storage.getItem('_portal_setting_');
    if(setting){
        return JSON.parse(setting);
    }
    return setting;
}
const setPortalSetting = setting => {
    console.log(setting);    
    storage.setItem('_portal_setting_', JSON.stringify(setting));
}

export const AppStorage = {
    getItem: storage.getItem,
    setItem: storage.setItem,
    removeItem: storage.removeItem,
    getName,
    getToken,
    getLastLogin,
    getPortalSetting,
    setPortalSetting,
    isLoggedIn: ()=>!!getName() && !!getToken(),
    performLogin: ({data})=>{
        storage.setItem('_token_', data.token);
        storage.setItem('_displayName_', data.displayName);
        storage.setItem('_lastLogin_', data.lastLogin);
    },
    performLogout: ()=>{
        const portalSetting = getPortalSetting();
        storage.clear();
        console.log('logout', portalSetting);
        if(portalSetting){        
            setPortalSetting({...portalSetting, expired: true});
        }
    }
}