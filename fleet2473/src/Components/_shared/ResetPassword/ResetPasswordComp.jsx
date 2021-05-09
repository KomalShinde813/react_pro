import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { validatePassword } from '../../../Core/Basic/StaticService';
import { resetPasswordWithToken } from '../../../Core/Services/LoginService'
import { useToast } from '../../../Core/Hooks/useToast';
import { useLoader } from '../../../Core/Hooks/useLoader';
import { useDialog } from '../../../Core/Hooks/useDialog';
import { InputPassword } from '../../../Core/Controls';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1, 0)
        }
    }
}))


let ResetPasswordComp = function ({ token, id }) {

    const { showToastWarning, showToastError, showToastSuccess } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { hideDialog } = useDialog();
    let classes = useStyles();
    console.log(token, id);

    let [formState, setFormState] = useState({
        password: '',
        confirmPassword: '',
    });

    function fieldChange(e) {
        let val = {
            [e.target.name]: e.target.value
        };
        setFormState(st => {
            return { ...st, ...val };
        })
    }

    const submit = async () => {
        if (!formState.password) {
            showToastWarning('Password and Confirm Password both are required.');
        }
        else if (!validatePassword(formState.password)) {
            showToastWarning('Password should be complex with 8 char minimum.');
        }
        else if (formState.password !== formState.confirmPassword) {
            showToastWarning('New Password and Confirm New Password should match.');
        } else {
            showLoader();
            let res = await resetPasswordWithToken(id, token, formState.password, formState.confirmPassword);
            hideLoader();
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
                <InputPassword autoFocus={true} label="Password" fullWidth value={formState.password} name="password" onChange={fieldChange} />
                <InputPassword label="Confirm Password" fullWidth value={formState.confirmPassword} name="confirmPassword" onChange={fieldChange} />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >Set Password</Button>
            </form>
        </Container>
    )
};

export default ResetPasswordComp;