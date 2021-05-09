import { useState } from 'react';

const LoaderState = () => {
  const [ isVisible, setIsVisible ] = useState( false );
  const [ messages, setMessages ] = useState( [] );

  function showLoader( msg ) {
    setMessages( msgs => ( [ msg || '', ...msgs ] ) );
    setIsVisible( true );
  }

  function hideLoader( msg ) {

    setMessages( oldMsgs => {
      let msgs = [ ...oldMsgs ];
      let ind = msgs.indexOf( msg || '' );
      if ( ind > -1 ) {
        msgs.splice( ind, 1 );
      } else {
        msgs.splice( 0, 1 );
      }
      setIsVisible( msgs.length > 0 );
      return [ ...msgs ]
    } );
  }

  return {
    isVisible,
    messages,
    showLoader,
    hideLoader
  }
};

export default LoaderState;