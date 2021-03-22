import TextField from "@material-ui/core/TextField";

export default props => {
    return <TextField
    margin="dense"
    required
    fullWidth    
    variant="outlined"
    {...props}    
    />
}