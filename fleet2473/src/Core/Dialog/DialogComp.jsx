import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

let DialogComp = ({ title, children, footer, onClose, maxWidth = 'sm' }) => {
    return (
        <>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={true} maxWidth={maxWidth}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>{children}</DialogContent>
                {footer && <DialogActions>{footer}</DialogActions>}
            </Dialog>
        </>
    );
};

export default DialogComp;
