import { useEffect, useState } from "react";
import { get } from "../Basic/HttpService";
import { AppStorage } from "../Basic/storage-service";

export const usePortalSettings = () => {
  const portalSettings = AppStorage.getPortalSetting() || { expired: true };
  let [ state, setState ] = useState( {} );
  useEffect( () => {
    async function getPortalSetting() {
      if ( portalSettings.expired ) {
        const res = await get( `portalSetting/${window.location.host}` );
        if ( res.data ) {
          AppStorage.setPortalSetting( res.data );
          setState( AppStorage.getPortalSetting() );
        }
      } else {
        setState( AppStorage.getPortalSetting() );
      }
    }
    getPortalSetting();
  }, [] );

  return state;
}