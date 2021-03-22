import React, { useContext, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppContext from "../../App/AppContext";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SignaturePad from "react-signature-canvas";
import {
    TextBox,
    SecondaryButton,
    PrimaryButton,
    SecondaryCheckbox,DialogContents,DialogTitles,DialogsActions,Dialogs
} from "./../FormInput";
import "./model.css";
const TechWriteUp = (props) => {
    const { hideModal } = useContext(AppContext);
    const signCanvas = useRef({});
    const signCanvasLeader = useRef({});
    const clear = () => signCanvas.current.clear();
    const clearLeader = () => signCanvasLeader.current.clear();
    const [state, setState] = useState({
        cause: "",
        cure: "",
        complaint: "",
        diagnosis: "",
        confirm: "",
        printname: "",
        readingtaken: "",
        codeused: "",
        print: "",
        failurereason: [],
        timeout: "",
        timein: "",
        mileageout: "",
        mileagein: "",
        modules: [],
        workaccomplished: [],
        trimmedDataURL: null,
        enableChange: false,
        smoketest: false,
        serviceindicator: false,
        radiocode: false,
        timeclock: false,
    });

    const handleClose = () => {
        hideModal();
    };
    const handleSubmit = () => {
        //  console.log(signCanvas.toDataURL("image/png"));
        // signCanvas.getTrimmedCanvas().toDataURL("image/png");
        hideModal();
    };

    const handleCheck = (event) => {
        const { name, checked } = event.target;
        setState((st) => {
            const nst = { ...st, [name]: checked };
            return nst;
        });
    };
    const fieldChange = (e) => {
        const { name, value } = e.target;
        setState((st) => {
            const nst = { ...st, [name]: value };
            nst.enableChange =
                nst.complaint && nst.diagnosis && nst.cause && nst.cure;
            return nst;
        });
    };
    const Workaccomplished = [
        { name: "Leeds", module1: 1994 },
        { name: "Bradford", module1: 1972 },
        { name: "Sheffield", module1: 1974 },
    ];

    const AutoBrChange = (event, value) => {
        setState((st) => {
            const nst = { ...st, workaccomplished: value };
            return nst;
        });
    };
    const Failurereason = [
        { name: "Reasons1", module1: 1994 },
        { name: "Reasons2", module1: 1972 },
        { name: "Reasons3", module1: 1974 },
    ];

    const AutoFrChange = (event, value) => {
        setState((st) => {
            const nst = { ...st, failurereason: value };
            return nst;
        });
    };

    return (
        <Dialogs open={true} onClose={handleClose} maxWidth="lg" fullScreen>
            <DialogTitles>Technician'S Write Up </DialogTitles>
            <DialogContents className="setDialogWidthTech">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormLabel component="legend">
                            Registration Number
                        </FormLabel>
                        <TextBox
                            disabled
                            id="outlined-disabled"
                            defaultValue="HX5KE1"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel component="legend">WIP NO</FormLabel>
                        <TextBox
                            disabled
                            id="outlined-disabled"
                            defaultValue="GHL7V"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Date</FormLabel>
                        <TextBox
                            id="date"
                            type="date"
                            onChange={fieldChange}
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Time Taken</FormLabel>
                        <TextBox
                            id="time"
                            type="time"
                            onChange={fieldChange}
                            defaultValue="07:20"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Reading Taken</FormLabel>
                        <TextBox
                            required
                            name="readingtaken"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Complaint</FormLabel>
                        <TextBox
                            required
                            name="complaint"
                            onChange={fieldChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Cause</FormLabel>
                        <TextBox
                            required
                            name="cause"
                            onChange={fieldChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Diagnosis</FormLabel>
                        <TextBox
                            required
                            name="diagnosis"
                            onChange={fieldChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Cure</FormLabel>
                        <TextBox
                            required
                            name="cure"
                            onChange={fieldChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">
                            Work Accomplished
                        </FormLabel>
                        <Autocomplete
                            multiple
                            options={Workaccomplished}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) =>
                                option.name === value.name
                            }
                            onChange={AutoBrChange}
                            name="workaccomplished"
                            Workaccomplished
                            renderInput={(params) => (
                                <TextBox {...params} multiline rows={2} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">Failure Reasons</FormLabel>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={Failurereason}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) =>
                                option.name === value.name
                            }
                            onChange={AutoFrChange}
                            name="failurereason"
                            Failurereason
                            renderInput={(params) => (
                                <TextBox {...params} multiline rows={2} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} className="gridcontainer">
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography className="heading">
                                        Diagnostic Road Test
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend">
                                                Mileage Out
                                            </FormLabel>
                                            <TextBox
                                                required
                                                type="number"
                                                name="mileageout"
                                                onChange={fieldChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend">
                                                Mileage In
                                            </FormLabel>
                                            <TextBox
                                                required
                                                type="number"
                                                name="mileagein"
                                                onChange={fieldChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid item xs={12}>
                                        <FormLabel component="legend">
                                            Time Out
                                        </FormLabel>
                                        <TextBox
                                            name="timeout"
                                            type="time"
                                            onChange={fieldChange}
                                            defaultValue="07:20"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel component="legend">
                                            Time In
                                        </FormLabel>
                                        <TextBox
                                            name="timein"
                                            type="time"
                                            onChange={fieldChange}
                                            defaultValue="07:20"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <SecondaryCheckbox
                                    checked={state.smoketest}
                                    onChange={handleCheck}
                                    name="smoketest"
                                />
                            }
                            label="Smoke Test Performed"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <SecondaryCheckbox
                                    checked={state.serviceindicator}
                                    onChange={handleCheck}
                                    name="serviceindicator"
                                />
                            }
                            label="Service Indicator Reset"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <SecondaryCheckbox
                                    checked={state.radiocode}
                                    onChange={handleCheck}
                                    name="radiocode"
                                />
                            }
                            label="Radio Code Reset"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <SecondaryCheckbox
                                    checked={state.timeclock}
                                    onChange={handleCheck}
                                    name="timeclock"
                                />
                            }
                            label="Time Clock Reset"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">
                            Technicians Signature
                        </FormLabel>
                        <SignaturePad
                            ref={signCanvas}
                            canvasProps={{
                                className: "signatureCanvas",
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormLabel component="legend">
                            Team Leader Signature
                        </FormLabel>
                        <SignaturePad
                            ref={signCanvasLeader}
                            canvasProps={{
                                className: "signatureCanvas",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContents>
            <DialogsActions>
                <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!state.enableChange}
                >
                    Submit
                </PrimaryButton>
            </DialogsActions>
        </Dialogs>
    );
};

export default TechWriteUp;
