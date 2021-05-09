import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { validatePassword } from '../Basic/StaticService';
import { changePassword } from '../Services/LoginService';
import { useToast } from '../Hooks/useToast';
import { useLoader } from '../Hooks/useLoader';
import { useDialog } from '../Hooks/useDialog';
import { InputPassword } from '../Controls';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1, 0)
        }
    }
}))


let ChangePasswordComp = function () {

    const { showToastWarning, showToastError, showToastSuccess } = useToast();
    const { showLoader, hideLoader } = useLoader();
    const { hideDialog } = useDialog();

    let classes = useStyles();

    let [formState, setFormState] = useState({
        currentPassword: '',
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
        if (!formState.currentPassword) {
            showToastWarning('Current Password is required');
        }
        else if (!validatePassword(formState.password)) {
            showToastWarning('New Password should be complex with 8 char minimum.');
        }
        else if (formState.password !== formState.confirmPassword) {
            showToastWarning('New Password and Confirm New Password should match.');
        } else {
            showLoader();
            let res = await changePassword(formState);
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
                <InputPassword autoFocus={true} label="Current Password" fullWidth value={formState.currentPassword} name="currentPassword" onChange={fieldChange} />
                <InputPassword label="New Password" fullWidth value={formState.password} name="password" onChange={fieldChange} />
                <InputPassword label="Confirm New Password" fullWidth value={formState.confirmPassword} name="confirmPassword" onChange={fieldChange} />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >Change Password</Button>
            </form>
        </Container>
    )
};

export default ChangePasswordComp;