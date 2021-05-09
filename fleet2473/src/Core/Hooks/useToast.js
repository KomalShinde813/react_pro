import { useContext } from "react";
import { AppContext } from "../App/PageLevel/AppContextProvider";

export const useToast = () => {
  const { toastState } = useContext( AppContext );
  return toastState;
}