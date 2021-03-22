import React, { useContext } from 'react'
import { Slide, Snackbar } from '@material-ui/core';
import AppContext from '../../App/AppContext';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export const Toast = props => {
    const { snackbar_open, snackbar_message, hideToast } = useContext(AppContext);
    return <Snackbar
        open={snackbar_open}
        autoHideDuration={3000}
        onClose={hideToast}
        message={snackbar_message}
        TransitionComponent={TransitionUp}
    />
}