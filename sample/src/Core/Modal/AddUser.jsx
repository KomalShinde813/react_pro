import React, { useContext, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import AppContext from "../../App/AppContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    TextBox,
    PasswordBox,
    SecondaryButton,
    PrimaryButton,
    PrimaryCheckbox,
} from "./../FormInput";
import "./model.css";
import { getWorkflows } from "../Service/workflow-service";
const AddUserModal = (props) => {
    const { hideModal } = useContext(AppContext);
    const [masterData, setMasterData] = useState({
        workflows: []
    })

    const [state, setState] = useState({
        userType: "",
        email: "",
        name: "",
        phone: "",
        password: "",
        confirm: "",        
        enableChange: false,
        allbranch: false,
        allcust: false,
        allworkflow: false,
        branches: [],
        customer: [],
        workflow: [],
    });
    const Branches = [
        { name: "Leeds", module1: 1994 },
        { name: "Bradford", module1: 1972 },
        { name: "Sheffield", module1: 1974 },
    ];
    const Cust = [
        { name: "Atlas Heating Supplies Ltd ", module1: 1994 },
        { name: "Aq-Rent Uk Ltd", module1: 1972 },
        { name: "L&S Copcutt & Son", module1: 1974 },
        { name: "Wbs Commercial Ltd  ", module1: 1974 },
    ];

    useEffect(async()=>{
        let res = await getWorkflows();
        if(res.success){
          const workflows = res.data.map(w=>({id:w.id, name: w.workflowName}));
          setMasterData(st=>({...st, workflows}));
        }
      }, []);

    const handleClose = () => {
        hideModal();
    };
    const handleSubmit = () => {
        console.log(state);
        hideModal();
    };    
    const AutoBrChange = (event, value) => {
        setState((st) => {
            const nst = { ...st, branches: value };
            return nst;
        });
    };
    const AutoCustChange = (event, value) => {
        setState((st) => {
            const nst = { ...st, customer: value };
            return nst;
        });
    };
    const AutoWorkChange = (event, value) => {
        setState((st) => {
            const nst = { ...st, workflow: value };
            return nst;
        });
    };

    const fieldChange = (e) => {
        const { name, value } = e.target;
        setState((st) => {
            const nst = { ...st, [name]: value };
            nst.enableChange =
                nst.password &&
                nst.email &&
                nst.name &&
                nst.phone &&
                nst.password === nst.confirm;
            return nst;
        });
    };
    const handleCheckbox = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            var res = "";
            setState((st) => {
                if (name == "allbranch") {
                    res = { ...st, branches: [...Branches] };
                }
                if (name == "allcust") {
                    res = { ...st, customer: [...Cust] };
                }
                if (name == "allworkflow") {
                    res = { ...st, workflow: [...masterData.workflows] };
                }
                return res;
            });
        }
        setState((st) => ({
            ...st,
            [name]: checked,
        }));
    };

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            maxWidth="md"
        >
            <DialogTitle>Add User</DialogTitle>
            <DialogContent className="removeScroll setDialogWidth">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextBox
                            autoFocus={true}
                            required
                            name="name"
                            label="Name"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextBox
                            required
                            label="Phone Number"
                            name="phone"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox
                            required
                            label="Email"
                            name="email"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <PasswordBox
                            label="Password"
                            name="password"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <PasswordBox
                            label="Confirm Password"
                            name="confirm"
                            onChange={fieldChange}
                        />
                    </Grid>
                    <Grid item row xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">User Type</FormLabel>
                            <Grid item xs={12}>
                                <RadioGroup
                                    row
                                    aria-label="userType"
                                    name="userType"
                                    value={state.userType}
                                    onChange={fieldChange}
                                >
                                    <FormControlLabel
                                        value="admin"
                                        control={<Radio />}
                                        label="Admin"
                                    />
                                    <FormControlLabel
                                        value="customer"
                                        control={<Radio />}
                                        label="Customer"
                                    />
                                    <FormControlLabel
                                        value="internaluser"
                                        control={<Radio />}
                                        label="Internal User"
                                    />
                                    <FormControlLabel
                                        value="auditor"
                                        control={<Radio />}
                                        label="Auditor"
                                    />
                                </RadioGroup>
                            </Grid>
                        </FormControl>
                    </Grid>                    
                    <Grid item xs={12} style={{minHeight:212}}>
                        {state.userType == "internaluser" ? (
                            <div>
                                {/* branch-start */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <PrimaryCheckbox
                                                onChange={handleCheckbox}
                                                checked={state.allbranch}
                                                name="allbranch"
                                                value={state.allbranch}
                                            />
                                        }
                                        label="All Branches"
                                    />
                                </Grid>
                                {!state.allbranch ? (
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={Branches}
                                        getOptionLabel={(option) => option.name}
                                        getOptionSelected={(option, value) =>
                                            option.name === value.name
                                        }
                                        onChange={AutoBrChange}
                                        name="branches"
                                        Branches
                                        renderInput={(params) => (
                                            <TextBox
                                                {...params}
                                                variant="outlined"
                                                label="Branch"
                                            />
                                        )}
                                    />
                                ) : null}
                                {/* branch-end */}
                                {/* workflow-start */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <PrimaryCheckbox
                                                onChange={handleCheckbox}
                                                checked={state.allworkflow}
                                                name="allworkflow"
                                                value={state.allworkflow}
                                            />
                                        }
                                        label="All Workflows"
                                    />
                                </Grid>
                                {!state.allworkflow ? (
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={masterData.workflows}
                                        getOptionLabel={(option) => option.name}
                                        getOptionSelected={(option, value) =>
                                            option.name === value.name
                                        }
                                        onChange={AutoWorkChange}
                                        name="workflow"
                                        Workflow
                                        renderInput={(params) => (
                                            <TextBox
                                                {...params}
                                                variant="outlined"
                                                label="Workflow"
                                            />
                                        )}
                                    />
                                ) : null}
                                {/* workflow-end */}
                            </div>
                        ) : null}
                        {state.userType == "customer" ? (
                            <div>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <PrimaryCheckbox
                                                onChange={handleCheckbox}
                                                checked={state.allcust}
                                                name="allcust"
                                                value={state.allcust}
                                            />
                                        }
                                        label="All Customer"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {!state.allcust ? (
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={Cust}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            getOptionSelected={(
                                                option,
                                                value
                                            ) => option.name === value.name}
                                            onChange={AutoCustChange}
                                            name="customer"
                                            Cust
                                            renderInput={(params) => (
                                                <TextBox
                                                    {...params}
                                                    variant="outlined"
                                                    label="Customer"
                                                />
                                            )}
                                        />
                                    ) : null}
                                </Grid>
                            </div>
                        ) : null}
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

export default AddUserModal;
