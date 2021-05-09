import { useContext } from "react";
import { AppContext } from "../App/PageLevel/AppContextProvider";

export const useLoader = () => {
  const { loaderState } = useContext( AppContext );

  return loaderState;
}