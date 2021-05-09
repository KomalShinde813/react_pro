import * as Components from '../../../../Components';
import { TypeOfAuth } from '../menu-auth-type';

export default [
    {
        label: 'Home',
        path: '/',
        exact: true,
        component: Components.SharedHome,
        authType: TypeOfAuth.Both
    },
    {
        label: 'Model',
        path: '/vehicle/model',
        exact: true,
        component: Components.ModelScreen,
        authType: TypeOfAuth.Auth
    },
    {
        label: 'SubCatagory',
        path: '/vehicle/vmrssubcatagory',
        exact: true,
        component: Components.VmrsSubCatagoryScreen,
        authType: TypeOfAuth.Auth
    }
];
