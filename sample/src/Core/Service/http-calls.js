import axios from 'axios';
import {AppStorage} from './storage-service'; 
let _server = ''
if ( process.env.NODE_ENV === 'production' ) {
  _server = 'https://ewipapi.synergiesoftware.com';
} else {
    _server = 'https://localhost:44367';
  _server = 'https://ewipapi.synergiesoftware.com';
}

const defaultOptions = {
    baseURL: `${_server}`,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: null
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    if (config.useAuthToken) {
        const token =  AppStorage.getToken();
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
});


const generateRoutingURL = url=>{
    if(/^\w/.test(url)){
        return `api/${url}`;
    }
    return url;
} 

export let put = async (url, data, options = {}) => {
    let res= await instance.put(generateRoutingURL(url), data, options);
    if(!res.data.success){
        console.warn(`Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})`);
    }
    return res.data;
};

export let post = async (url, data, options = {}) => {
    let res= await instance.post(generateRoutingURL(url), data, options);
    if(!res.data.success){
        console.warn(`Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})`);
    }
    return res.data;
};

export let get = async (url, options = {}) => {
    let res = await instance.get(generateRoutingURL(url), options);
    if(!res.data.success){
        console.warn(`Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})`);
    }
    return res.data;
};