import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './ButtonModal.scss';

export const AddButton = (props) => {
    return (
        <span className="modal-btn">
            <Button variant="contained" color="secondary" size="small" {...props}>
                <AddIcon fontSize="small" style={{ fontSize: 15 }} />
            </Button>
        </span>
    );
};

export const EditButton = (props) => {
    return (
        <span className="modal-btn-update">
            <Button variant="contained" color="secondary" size="small" {...props}>
                <EditIcon fontSize="small" style={{ fontSize: 15 }} />
            </Button>
        </span>
    );
};
