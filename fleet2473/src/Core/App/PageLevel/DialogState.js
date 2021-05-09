import { useState } from 'react';

const DialogState = () => {
  let [ dialogState, setDialogState ] = useState( {} );

  let showDialog = ( name, args ) => {
    setDialogState( { name, args } )
  }

  let hideDialog = () => setDialogState( {} );

  return {
    dialogState,
    showDialog,
    hideDialog
  }
};

export default DialogState;