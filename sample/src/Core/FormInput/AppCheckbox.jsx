import Checkbox from "@material-ui/core/Checkbox";

export const PrimaryCheckbox = (props) => {
    return (
        <Checkbox
            inputProps={{ "aria-label": "primary checkbox" }}
            {...props}
        />
    );
};

export const SecondaryCheckbox = (props) => {
    return (
        <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            {...props}
        />
    );
};
