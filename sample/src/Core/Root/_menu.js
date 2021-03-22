import * as Components from "./../../Components";

export const TypeOfAuth = {
    NonAuth: 0,
    Auth: 1,
    Both: 2,
};
export const menu = [
    {
        label: "Home",
        path: "/",
        exact: true,
        component: Components.home,
        authType: TypeOfAuth.NonAuth,
    },
    {
        label: "Home",
        path: "/",
        exact: true,
        component: Components.dashboard,
        authType: TypeOfAuth.Auth,
    },
    {
        label: "Admin",
        path: "/admin",
        component: Components.admin,
        authType: TypeOfAuth.Auth,
    },
    {
        label: "Technician App",
        path: "/technicianapp",
        component: Components.technicianApp,
        authType: TypeOfAuth.Auth,
    },
    {
        label: "Login",
        path: "/login",
        component: Components.login,
        authType: TypeOfAuth.NonAuth,
    },
    {
        label: "Logout",
        path: "/logout",
        component: Components.logout,
        authType: TypeOfAuth.Auth,
    },
    {
        label: "Workflow Job",
        hidden: true,
        path: "/job/:jobId",
        component: Components.workflowJobDetails,
        authType: TypeOfAuth.Auth,
    },
];
