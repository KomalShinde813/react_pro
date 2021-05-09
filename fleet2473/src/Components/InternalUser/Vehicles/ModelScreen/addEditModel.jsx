import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, FormControlLabel, FormHelperText, InputAdornment, InputLabel } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { InputText, SecondaryCheckbox, SelectBox } from '../../../../Core/Controls';
import { getModelById, postModelData, getModelDropdownData } from '../../../../Core/Services/InternalUser/modelService';
import { useToast } from '../../../../Core/Hooks/useToast';
import { useLoader } from '../../../../Core/Hooks/useLoader';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const DialogStyle = {
    dialogInput: { width: '100%' },
    mandatoryLabel: { color: 'red' }
};

const AddEditModel = (props) => {
    const { showToastSuccess, showToastError } = useToast();
    const { showLoader, hideLoader } = useLoader();

    const [state, setState] = useState({
        modelActive: true,
        modelID: null,
        modelMargin: '',
        makeList: [],
        vehicleTypeList: [],
        errors: {}
    });

    useEffect(async () => {
        if (props.modelId) {
            showLoader();
            let res = await getModelById(props.modelId);
            hideLoader();
            if (res.success) {
                setState((st) => ({
                    ...st,
                    makeDescription: res.data.makeDescription,
                    modelActive: res.data.modelActive,
                    modelCode: res.data.modelCode,
                    modelDescription: res.data.modelDescription,
                    modelID: res.data.modelID,
                    modelMakeID: res.data.modelMakeID,
                    modelMakerCode: res.data.modelMakerCode,
                    modelMargin: res.data.modelMargin,
                    modelPhoto: res.data.modelPhoto,
                    modelWarrantyGroupCode: res.data.modelWarrantyGroupCode,
                    vehicleTypeDescription: res.data.vehicleTypeDescription,
                    modelVehicleTypeID: res.data.modelVehicleTypeID
                }));
            }
        }
        let dropDwonRes = await getModelDropdownData();
        if (dropDwonRes.success) {
            const Makes = dropDwonRes.data.makes.map((w) => ({
                id: w.makeID,
                name: w.makeDescription
            }));
            const vehicleType = dropDwonRes.data.vehicleTypes.map((w) => ({
                id: w.vehicleTypeID,
                name: w.vehicleTypeDescription
            }));
            setState((st) => ({ ...st, makeList: Makes, vehicleTypeList: vehicleType }));
        }
    }, []);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState((st) => ({ ...st, [name]: value }));
    };

    let imagehandler = (event) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            const { result } = e.target;
            setState((st) => ({ ...st, modelPhoto: result }));
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const validations = () => {
        const { modelCode, modelDescription, modelMakeID, modelMakerCode, modelMargin, modelWarrantyGroupCode, modelVehicleTypeID } = state;
        const decimalPattern = /^\d+(\.\d{1,2})?$/;

        let formIsValid = true;
        let errors = {};
        if (!modelMakeID) {
            errors.modelMakeID = 'This field is required';
            formIsValid = false;
        }
        if (!modelVehicleTypeID) {
            errors.modelVehicleTypeID = 'This field is required';
            formIsValid = false;
        }
        if (!modelCode) {
            errors.modelCode = 'This field is required';
            formIsValid = false;
        }
        if (!modelDescription) {
            errors.modelDescription = 'This field is required';
            formIsValid = false;
        }
        if (modelMargin.length != 0 && !decimalPattern.test(modelMargin)) {
            errors.modelMargin = `This field accepts only decimal value "1.0"`;
            formIsValid = false;
        }
        setState((st) => ({ ...st, errors: errors }));
        return formIsValid;
    };

    const selectHandler = (e) => {
        const { name, checked } = e.target;
        setState((state) => ({ ...state, [name]: checked }));
    };

    const submitHandler = async () => {
        if (validations()) {
            let formData = {
                modelID: state.modelID,
                modelCode: state.modelCode,
                modelDescription: state.modelDescription,
                modelMakeID: state.modelMakeID,
                modelMakerCode: state.modelMakerCode,
                modelPhoto: state.modelPhoto,
                modelVehicleTypeID: state.modelVehicleTypeID,
                modelWarrantyGroupCode: state.modelWarrantyGroupCode,
                modelMargin: state.modelMargin,
                modelActive: state.modelActive
            };
            let res = await postModelData(formData);
            if (res.success) {
                showToastSuccess(res.message);
                props.onClose(true);
            } else {
                showToastError(res.message);
            }
        }
    };

    return (
        <Grid container direction={'row'} spacing={2} alignItems="center" justify="center">
            <Grid item xs={6} sm={4}>
                <InputLabel shrink style={DialogStyle.mandatoryLabel}>
                    Make
                </InputLabel>
                <SelectBox
                    name="modelMakeID"
                    value={state.modelMakeID || ''}
                    onChange={inputChange}
                    List={state.makeList}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <GroupOutlinedIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelMakeID}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink style={DialogStyle.mandatoryLabel}>
                    {' '}
                    Vehicle Type
                </InputLabel>
                <SelectBox
                    name="modelVehicleTypeID"
                    value={state.modelVehicleTypeID || ''}
                    onChange={inputChange}
                    List={state.vehicleTypeList}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DriveEtaRoundedIcon />
                            </InputAdornment>
                        )
                    }}
                />

                <FormHelperText error>{state.errors.modelVehicleTypeID}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink style={DialogStyle.mandatoryLabel}>
                    {' '}
                    Model Code
                </InputLabel>
                <InputText
                    fullWidth
                    placeholder="Model Code"
                    value={state.modelCode || ''}
                    onChange={inputChange}
                    name="modelCode"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelCode}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink style={DialogStyle.mandatoryLabel}>
                    Description
                </InputLabel>
                <InputText
                    fullWidth
                    placeholder="Description"
                    value={state.modelDescription || ''}
                    onChange={inputChange}
                    name="modelDescription"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeOutlinedIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelDescription}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink>Maker</InputLabel>
                <InputText
                    fullWidth
                    placeholder="Maker"
                    value={state.modelMakerCode || ''}
                    onChange={inputChange}
                    name="modelMakerCode"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeOutlinedIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelMakerCode}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink>Warranty Group Code</InputLabel>
                <InputText
                    fullWidth
                    placeholder="Warranty Group Code"
                    value={state.modelWarrantyGroupCode || ''}
                    onChange={inputChange}
                    name="modelWarrantyGroupCode"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeOutlinedIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelWarrantyGroupCode}</FormHelperText>
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputLabel shrink>Margin</InputLabel>
                <InputText
                    fullWidth
                    placeholder="Margin"
                    value={state.modelMargin || ''}
                    onChange={inputChange}
                    name="modelMargin"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeOutlinedIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText error>{state.errors.modelMargin}</FormHelperText>
            </Grid>
            <Grid item xs={8} sm={4}>
                <input type="file" name="image_value" onChange={imagehandler} accept="image/*" />
            </Grid>
            <Grid item xs={4} sm={4}>
                <FormControlLabel control={<SecondaryCheckbox checked={state.modelActive} name="modelActive" onChange={selectHandler} />} label="Is Active" />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={submitHandler} fullWidth variant="contained" color="secondary">
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddEditModel;
