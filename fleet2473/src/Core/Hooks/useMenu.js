import { useMemo } from "react";
import { getMenuForRole } from "../NavAndMenu/_menu";
import { useLoginInfo } from "./useLoginInfo";

export const useCurrentMenus = () => {
  const { isLoggedIn, userRoles } = useLoginInfo()
  const currentMenus = useMemo( () => {
    return getMenuForRole( userRoles, isLoggedIn );
  }, [ isLoggedIn ] );
  return currentMenus;
}