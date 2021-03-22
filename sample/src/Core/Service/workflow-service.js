import {get, post} from './http-calls';

export const getWorkflows = async ()=>{
    let res = await get('workflow', {useAuthToken:true});    
    return res;
}