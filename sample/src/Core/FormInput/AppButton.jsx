import Button from "@material-ui/core/Button"


export const DefaultButton = props => {
    return <Button variant="contained" {...props}>{props.children}</Button>
}

export const PrimaryButton = props => {
    return <DefaultButton color="primary" {...props}>{props.children}</DefaultButton>
}

export const SecondaryButton = props => {
    return <DefaultButton color="secondary" {...props}>{props.children}</DefaultButton>
}
