import {post} from './http-calls';
import { AppStorage } from './storage-service';

export const login = async (userName, password)=>{
    let res = await post('/login', {
        "loginName": userName,
        "password": password
    });
    if(res.success){
        AppStorage.performLogin(res.data);
    }
    return res;
}