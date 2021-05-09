import { useState } from 'react';

const ToastState = () => {
  const [ isVisible, setIsVisible ] = useState( false );
  const [ text, setText ] = useState( '' );
  const [ severity, setSeverity ] = useState( 'info' );
  const [ timeout, setTimeout ] = useState( 5000 );

  function showToast( msg, timeout = 5000, severity ) {
    setText( msg );
    setTimeout( timeout );
    setSeverity( severity );
    setIsVisible( true );
  }

  function hideToast() {
    setIsVisible( false );
  }

  let showToastError = ( msg, timeout ) => {
    showToast( msg, timeout, 'error' );
  }
  let showToastWarning = ( msg, timeout ) => {
    showToast( msg, timeout, 'warning' );
  }
  let showToastInfo = ( msg, timeout ) => {
    showToast( msg, timeout, 'info' );
  }
  let showToastSuccess = ( msg, timeout ) => {
    showToast( msg, timeout, 'success' );
  }

  return {
    isVisible,
    text,
    severity,
    timeout,
    showToast,
    showToastError,
    showToastWarning,
    showToastInfo,
    showToastSuccess,
    hideToast,
    setText
  }
};

export default ToastState;