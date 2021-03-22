import React, { useContext,useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppContext from '../../App/AppContext';
import {PasswordBox, SecondaryButton, PrimaryButton} from './../FormInput'
import { makeStyles } from "@material-ui/core/styles";

const PasswordChangeModal = props => {
    const { hideModal } = useContext(AppContext);
    const [state, setState] = useState({
        current:'',
        new:'',
        confirm:'',
        enableChange:false
    })

    const handleClose = () => {
        hideModal();
    };

    const fieldChange = e=>{
        const {name, value} = e.target;
        setState(st=>{
            const nst = {...st, [name]:value};
            nst.enableChange = nst.current && nst.new && nst.confirm && (nst.new === nst.confirm);
            return nst;
        });
    }

    return <Dialog open={true} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
            <PasswordBox autoFocus label="Current Password" name="current" onChange={fieldChange} />
            <PasswordBox label="New Password" name="new" onChange={fieldChange}/>
            <PasswordBox label="Password Password" name="confirm" onChange={fieldChange}/>
        </DialogContent>
        <DialogActions>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleClose} disabled={!state.enableChange}>Change</PrimaryButton>
        </DialogActions>
    </Dialog>
}

export default PasswordChangeModal;