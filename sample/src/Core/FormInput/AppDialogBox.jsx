import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Dialogs = props => {
    return <Dialog aria-labelledby  {...props}>{props.children}</Dialog>
}

export const DialogTitles = props => {
    return <DialogTitle  {...props}>{props.children}</DialogTitle>
}

export const DialogContents = props => {
    return <DialogContent  {...props}>{props.children}</DialogContent>
}

export const DialogsActions = props => {
    return <DialogActions  {...props}>{props.children}</DialogActions>
}
