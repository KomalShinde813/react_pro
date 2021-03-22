import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import AppContext from "../../App/AppContext";
import TextField from "@material-ui/core/TextField";
import { TextBox, SecondaryButton, PrimaryButton } from "./../FormInput";
import "./model.css";
const ServiceAdvCust = (props) => {
    const { hideModal } = useContext(AppContext);
    const [state, setState] = useState({
        reporteddefect: "",
        problem: "",
        warning: "",
        repairs: "",
        modifications: "",
        fault: "",
        operating_conditions: "",
        person: "",
        enableChange: false,
    });

    const handleClose = () => {
        hideModal();
    };
    const handleSubmit = () => {
        hideModal();
    };
    const fieldChange = (e) => {
        const { name, value } = e.target;
        setState((st) => {
            const nst = { ...st, [name]: value };
            nst.enableChange =
                nst.repairs && nst.modifications && nst.fault && nst.person;
            return nst;
        });
    };

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="lg">
            <DialogTitle>Service Advisor Customer Consultation</DialogTitle>
            <DialogContent className="setDialogWidth">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-disabled"
                            label="Registration Number"
                            defaultValue="HX5KE1"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-disabled"
                            label="WIP NO"
                            defaultValue="GHL7V"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            autoFocus={true}
                            id="date"
                            label="Date"
                            type="date"
                            onChange={fieldChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="time"
                            label="Reported defect"
                            onChange={fieldChange}
                            name="reporteddefect"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            placeholder="(Engine idle speed / driving etc.)"
                            name="problem"
                            onChange={fieldChange}
                            label="When and under what conditions did the problem occur? "
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="warning"
                            label="Were there any warning signs / lights?  "
                            placeholder="(Messages / symbols in the display)"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="repairs"
                            label="Were any repairs recently made on the vehicle?"
                            placeholder="(At any workshop / body shop)."
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="modifications"
                            label="Have any modifications been made to the vehicle? "
                            placeholder="(Retrofit Installations etc.)"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="fault"
                            label="Does the fault occur constantly or only sporadically?"
                            placeholder="(If sporadically, is there a pattern to the occurrence)."
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="operating_conditions"
                            label="Is the vehicle subject to special operating conditions?"
                            placeholder="(Operation on land fill / sand pit)."
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            onChange={fieldChange}
                            name="person"
                            label="Which person primarily operates the vehicle?"
                            placeholder="(If possible note down a name and contact number, if different to the vehicle presenter)."
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rows={3}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!state.enableChange}
                >
                    Submit
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceAdvCust;
