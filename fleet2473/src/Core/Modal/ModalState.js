import { useState } from 'react';

const ModalState = () => {
  const [ isVisible, setIsVisible ] = useState( false );

  function closePopup() {
    setIsVisible( !isVisible );
  }

  return {
    isVisible,
    closePopup,
  }
};

export default ModalState;