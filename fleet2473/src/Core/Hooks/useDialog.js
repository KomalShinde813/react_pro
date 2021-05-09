import { useContext } from "react";
import { AppContext } from "../App/PageLevel/AppContextProvider";

export const useDialog = () => {
  const { dialogState } = useContext( AppContext );

  return dialogState;
}