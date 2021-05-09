import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { forgotPasswordRequest } from '../Services/LoginService';
import { useToast } from '../Hooks/useToast';
import { useDialog } from '../Hooks/useDialog';
import { InputText } from '../Controls';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1, 0)
        }
    }
}));

let ForgotPasswordComp = function () {
    const { showToastWarning, showToastError, showToastSuccess } = useToast();
    const { hideDialog } = useDialog();

    let classes = useStyles();

    let [email, setEmail] = useState('');


    const submit = async () => {
        if (!email) {
            showToastWarning('Please provide your registered mail id.');
        }
        else {
            let res = await forgotPasswordRequest(email);
            if (res.success) {
                showToastSuccess(res.message);
                hideDialog();
            } else {
                showToastError(res.message);
            }
        }
    }

    return (
        <Container maxWidth="xs">
            <form autoComplete="off" className={classes.root}>
                <InputText autoFocus={true} label="Email" fullWidth value={email} name="email" onChange={e => setEmail(e.target.value)} />

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >Reset</Button>
            </form>
        </Container>
    )
};

export default ForgotPasswordComp;