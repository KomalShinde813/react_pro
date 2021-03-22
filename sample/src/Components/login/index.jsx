import React, { useContext, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../../Core/Service/login-service";
import AppContext from "../../App/AppContext";
import { TextBox, PasswordBox, SecondaryButton } from '../../Core/FormInput';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
}));

function LoginForm(props) {
    const [state, setState] = useState({
        userName: "admin@project.com",
        password: "",
    });
    const { showToast } = useContext(AppContext);

    const userNameUpdated = (e)=>{
        const { value } = e.target;
        setState(st => ({...st, userName: value}));
    }

    const passwordUpdated = (e)=>{
        const { value } = e.target;
        setState(st=> ({...st, password: value}));
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (state.userName && state.password) {
            const res = await login(state.userName, state.password);
            if (!res.success) {
                showToast(res.message)
            }
            else {
                props.history.push("/");
                window.location.reload();
            }
        } else {
            showToast('User Name and Password both required.');
        }
    };

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextBox    
                        autoFocus={true}                    
                        required                                                
                        label="Email"
                        onChange={userNameUpdated}
                        value={state.userName}
                    />
                    <PasswordBox                        
                        required                        
                        label="Password"                    
                        onChange={passwordUpdated}
                        value={state.password}
                    />
                    <SecondaryButton                        
                        fullWidth                        
                        onClick={handleSubmitClick}
                    >
                        Sign In
                    </SecondaryButton>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
