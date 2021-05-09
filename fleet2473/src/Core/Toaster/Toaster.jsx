import React from 'react'
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/snackbar'
import MuiAlert  from '@material-ui/lab/alert'

let Toaster = function ({state}) {
    return ReactDOM.createPortal(<>
        <Snackbar open={state.isVisible} autoHideDuration={state.timeout} onClose={state.hideToast}>
            <MuiAlert severity={state.severity} onClose={state.hideToast}>{state.text}</MuiAlert>
        </Snackbar>       
    </>, document.body);
};

export default Toaster;