import React, { useState } from 'react';
import { IconButton, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField"
import { Visibility, VisibilityOff } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    showIcon: {
        padding: 0,
        marginRight: 0
    }
}));

let PasswordField = (props) => {
    let classes = useStyles();
    let [showPass, setShowPass] = useState(false);

    let setShowPassword = () => {
        setShowPass(st => !st);
    }
    return <TextField
        size="small"
        variant="outlined"
        {...props}
        className={`${classes.passField} ${props.className || ''}`}
        type={showPass ? "text" : "password"}
        InputProps={{
            endAdornment: <IconButton
                className={classes.showIcon}
                aria-label="toggle password visibility"
                onClick={setShowPassword}
                edge="end"
            >
                {showPass ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        }}
    />
}

export default PasswordField;