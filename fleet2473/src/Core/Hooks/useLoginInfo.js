import { useEffect, useState } from "react";
import { AppStorage } from "../Basic/storage-service";

export const useLoginInfo = () => {
  let [ state, setState ] = useState( {
    isLoggedIn: false,
    token: '',
    displayName: '',
    lastLogin: null,
    userRoles: [],
  } );
  useEffect( () => {
    setState( {
      isLoggedIn: AppStorage.isLoggedIn(),
      token: AppStorage.getToken(),
      displayName: AppStorage.getName(),
      lastLogin: AppStorage.getLastLogin(),
      userRoles: AppStorage.getUserRoles(),
    } )
  }, [ AppStorage.loginInfoUpdatedAt() ] );

  return state;
}