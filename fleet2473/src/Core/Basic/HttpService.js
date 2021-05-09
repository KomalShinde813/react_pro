import axios from 'axios';
import { getConstants } from "./StaticService";
import { AppStorage } from './storage-service';

let server = ''
if ( process.env.NODE_ENV === 'production' ) {
  server = getConstants( 'backendUrl' ).prod;
} else {
  server = getConstants( 'backendUrl' ).dev;
}

const defaultOptions = {
  baseURL: `${server}`,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: null
};

let instance = axios.create( defaultOptions );

instance.interceptors.request.use( function( config ) {
  if ( config.useAuthToken ) {
    const token = AppStorage.getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
} );

const generateRoutingURL = url => {
  if ( /^\w/.test( url ) ) {
    return `api/${url}`;
  }
  return url;
}


export let putWithAuth = async ( url, data, options = { useAuthToken: true } ) => {
  return await put( url, data, options );
}

export let put = async ( url, data, options = {} ) => {
  let res = await instance.put( generateRoutingURL( url ), data, options );
  if ( !res.data.success ) {
    console.warn( `Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})` );
  }
  return res.data;
};

export let postWithAuth = async ( url, data, options = { useAuthToken: true } ) => {
  return await post( url, data, options );
}

export let post = async ( url, data, options = {} ) => {
  let res = await instance.post( generateRoutingURL( url ), data, options );
  if ( !res.data.success ) {
    console.warn( `Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})` );
  }
  return res.data;
};


export let getWithAuth = async ( url, options = { useAuthToken: true } ) => {
  return await get( url, options );
}

export let get = async ( url, options = {} ) => {
  let res = await instance.get( generateRoutingURL( url ), options );
  if ( !res.data.success ) {
    console.warn( `Request fail. Status Code:(${res.status}), Status Text:(${res.statusText})` );
  }
  return res.data;
};