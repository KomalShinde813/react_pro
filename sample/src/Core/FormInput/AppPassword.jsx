import {useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default props => {
    let [showPass, setShowPass] = useState(false);

    const togglePasswordVisibility = ()=> {
        setShowPass(st=>!st);
    }

    return <TextField
    margin="dense"
    required
    fullWidth    
    variant="outlined"
    {...props}
    type={showPass ? 'text' : 'password'}
    InputProps={{
    endAdornment:(
        <InputAdornment position="end">
          <IconButton
            tabIndex="-1"
            title="toggle password visibility"
            aria-label="toggle password visibility"
            onClick={togglePasswordVisibility}
            edge="end"
          >
            {showPass ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
    )
    }}
    />
}