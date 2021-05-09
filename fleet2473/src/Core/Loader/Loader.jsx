import React from 'react'
import ReactDOM from 'react-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

let LoaderSpinner = function ({ state }) {
  const classes = useStyles();
  let showMsg = state.messages && state.messages.length > 0 && state.messages[0].length > 0;
  return <>
    {state.isVisible
      ? ReactDOM.createPortal(<Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        {showMsg && <Chip label={state.messages[0]} style={{ "marginTop": "100px", "transform": "translateX(calc(-50% - 20px))" }} />}
      </Backdrop>, document.body)
      : null}
  </>;
};

export default LoaderSpinner;