import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { PasswordBox, SecondaryButton, TextBox } from "../../Core/FormInput";

function LoginForm(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmpass: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            name: state.name,
            email: state.email,
            password: state.password,
            confirmpass: state.confirmpass,
        };
        console.log(payload);
        //post payload to the server
        props.history.push("/login");
    };

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

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <TextBox                        
                        required                        
                        name="name"
                        label="User Name"                        
                        onChange={handleChange}
                    />
                    <TextBox
                        required                        
                        name="email"
                        label="Email"                        
                        onChange={handleChange}
                    />
                    <PasswordBox                        
                        required                        
                        name="password"
                        label="Password"                        
                        onChange={handleChange}
                    />
                    <TextBox                        
                        required                        
                        name="confirmpass"
                        label="Confirm Password"                        
                        onChange={handleChange}
                    />
                    <SecondaryButton
                        type="submit"
                        fullWidth
                        onClick={handleSubmitClick}
                    >
                        Register
                    </SecondaryButton>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Log in"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
