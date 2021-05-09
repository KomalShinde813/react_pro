import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const SelectBox = (props) => {
    let insertEmpty = props.insertEmpty;
    if (insertEmpty === undefined) {
        insertEmpty = true;
    }
    return (
        <TextField select size="small" variant="outlined" {...props} fullWidth>
            {insertEmpty && (
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
            )}
            {props.List.length > 0 &&
                props.List.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export default SelectBox;
