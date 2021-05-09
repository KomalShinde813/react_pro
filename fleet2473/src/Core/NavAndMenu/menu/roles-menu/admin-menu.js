import * as Components from "./../../../../Components";
import { TypeOfAuth } from './../menu-auth-type';

export default [ {
  label: "Home",
  path: "/",
  exact: true,
  component: Components.SharedHome,
  authType: TypeOfAuth.Both
} ];