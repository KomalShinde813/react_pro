import { get } from 'lodash';


let { passwordValidateRegex } = window._ENV_;

export let getConstants = prop => prop ? get( window._ENV_, prop ) : window._ENV_;

export let getHashPathParts = () => {
  let qs = window.location.hash.split( '/' ).splice( 2 );
  return qs;
}

export let validatePassword = password => {
  return passwordValidateRegex.test( password );
}