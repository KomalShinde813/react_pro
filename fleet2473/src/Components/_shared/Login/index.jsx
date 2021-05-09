import React from 'react';
import LoginComp from './LoginComp';
import { Container, Grid, Link } from '@material-ui/core';
import { CommonModals } from '../../../Core/App/PageLevel/AppContextProvider';
import { useDialog } from '../../../Core/Hooks/useDialog';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1, 0)
//         },
//         '& > button': {
//             margin: theme.spacing(3, 0, 2)
//         }
//     }
// }));

let Login = props => {
    const { showDialog } = useDialog();


    const onSuccess = () => {
        props.history.push("/");
        window.location.reload();
    }
    return <>
        <Container maxWidth="xs">
            <LoginComp onSuccess={onSuccess} />
            <Grid container >
                <Grid item xs>
                    <Link component="button" onClick={() => showDialog(CommonModals.ForgotPassword)} variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                    {/* <Link component="button" onClick={e => alert('not implemented yet.')} variant="body2">Sign Up</Link> */}
                </Grid>
            </Grid>
        </Container>
    </>
};

export default Login;