import React, { useContext,useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppContext from '../../App/AppContext';
import {SecondaryButton, PrimaryButton} from './../FormInput'

const DeleteModal = props => {
    const { hideModal } = useContext(AppContext);

    const handleClose = () => {
        hideModal();
    };

    return <Dialog open={true} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
            <span>Are you sure do you want to delete this item</span>
        </DialogContent>
        <DialogActions>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleClose}>Delete</PrimaryButton>
        </DialogActions>
    </Dialog>
}

export default DeleteModal;