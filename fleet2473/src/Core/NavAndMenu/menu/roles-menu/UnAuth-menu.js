import * as Components from "./../../../../Components";
import { TypeOfAuth } from './../menu-auth-type';

export default [ {
  label: "Home",
  path: "/",
  exact: true,
  component: Components.SharedHome,
  authType: TypeOfAuth.Both,
}, {
  label: "Login",
  path: "/login",
  exact: true,
  component: Components.Login,
  authType: TypeOfAuth.NonAuth,
}, {
  label: "Reset Password",
  path: "/ResetPassword/:id",
  hidden: true,
  component: Components.ResetPassword,
  authType: TypeOfAuth.NonAuth,
} ];