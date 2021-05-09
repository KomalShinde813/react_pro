import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { tryLogin } from '../../../Core/Services/LoginService';
import { useLoginInfo } from '../../../Core/Hooks/useLoginInfo';
import { useLoader } from '../../../Core/Hooks/useLoader';
import { useToast } from '../../../Core/Hooks/useToast';
import { InputText, InputPassword } from '../../../Core/Controls';

let defaultState = {
    name: '',
    password: ''
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        '& > *': {
            margin: theme.spacing(1, 0)
        },
        '& > button': {
            margin: theme.spacing(3, 0, 2)
        }
    }
}));

let LoginComp = (props) => {
    const classes = useStyles();
    const { showLoader, hideLoader } = useLoader();
    const { showToastWarning, showToastError } = useToast();
    let { isLoggedIn } = useLoginInfo();
    let [model, setState] = useState(defaultState);

    let onFieldChange = e => {
        let obj = {
            [e.target.name]: e.target.value
        }
        setState(st => ({ ...st, ...obj }));
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            loginUser();
        }
    }

    let loginUser = async () => {
        if (model.name && model.password) {
            showLoader();
            let res = await tryLogin(model);
            hideLoader();
            if (res.success) {
                props.onSuccess && props.onSuccess();
            } else {
                showToastError(res.message);
            }
        } else {
            showToastWarning('Name and Password is required.');
        }
    }

    return <>
        {!isLoggedIn &&

            <form className={classes.root}>
                <InputText autoFocus={true} fullWidth label="User Name" value={model.name} name="name" onChange={onFieldChange} onKeyDown={handleEnter} />
                <InputPassword fullWidth label="Password" value={model.password} name="password" onChange={onFieldChange} onKeyDown={handleEnter} />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    disabled={!model.name || !model.password}
                    endIcon={<SendIcon />}
                    onClick={loginUser}>
                    Login
                </Button>

            </form>
        }
    </>
};

export default LoginComp;