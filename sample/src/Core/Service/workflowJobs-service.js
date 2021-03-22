import {get, post} from './http-calls';

export const getWorkflowJobs = async (workflowId)=>{
    let res = await get(`WorkflowJobs/${workflowId}`, { useAuthToken: true });    
    return res;
}