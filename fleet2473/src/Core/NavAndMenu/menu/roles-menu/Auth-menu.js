import * as Components from "./../../../../Components";
import { TypeOfAuth } from './../menu-auth-type';

export default [ {
  label: "Logout",
  path: "/logout",
  exact: true,
  component: Components.Logout,
  authType: TypeOfAuth.Auth,
} ];