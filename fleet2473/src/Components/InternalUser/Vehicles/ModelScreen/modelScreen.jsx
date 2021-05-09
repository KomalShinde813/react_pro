import React, { useEffect, useMemo, useState } from 'react';
import AddEditModel from './addEditModel';
import DataGrid from '../../../../Core/Controls/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { getAllModels } from '../../../../Core/Services/InternalUser/modelService';
import DialogComp from '../../../../Core/Dialog/DialogComp';
import { AddButton, EditButton } from '../../../../Core/Controls';
import './style.scss';

const modelgridStyle = {
    gridContainer: { height: '600px' },
    formatterImageContainer: { width: '100%', textAlign: 'center' },
    formatterImage: { width: 90, height: 'auto', backgroundSize: 'cover' },
    formatterEditBtn: { textAlign: 'center' }
};

const renderImage = (data) => {
    let isBase64img = data.row.modelPhoto.includes('base64');
    return (
        <div style={modelgridStyle.formatterImageContainer}>
            <img src={isBase64img ? data.row.modelPhoto : 'data:image/png;base64,' + data.row.modelPhoto} alt={'logo'} style={modelgridStyle.formatterImage} />
        </div>
    );
};

const basecolumns = [
    { key: 'action', name: 'Action', width: '5%' },
    { key: 'modelCode', name: 'Code' },
    { key: 'modelDescription', name: 'Description' },
    { key: 'vehicleTypeDescription', name: 'Type' },
    { key: 'modelMakerCode', name: 'Maker Code' },
    { key: 'makeDescription', name: 'Make' },
    { key: 'modelPhoto', name: 'Logo', formatter: renderImage },
    { key: 'modelWarrantyGroupCode', name: 'Warrenty Group' },
    { key: 'modelMargin', name: 'Margin' }
];

const ModelScreen = () => {
    const [state, setState] = useState({ modalToggle: false, userId: null, List: [], showLoader: true });

    useEffect(async () => {
        pullModel();
    }, []);

    const pullModel = async () => {
        let res = await getAllModels();
        setState((st) => ({
            ...st,
            List: [...res.data],
            showLoader: false
        }));
    };

    const renderEdit = (data) => {
        return (
            <div style={modelgridStyle.formatterEditBtn}>
                <EditButton onClick={() => handleUpdate(data.row)} />
            </div>
        );
    };

    const columns = useMemo(() => {
        const tempCols = [...basecolumns];
        let actionCol = tempCols.find((element) => element.key === 'action');
        if (actionCol) {
            actionCol.formatter = renderEdit;
        }

        return tempCols;
    }, []);

    const handleUpdate = (params) => {
        setState((state) => ({ ...state, userId: params.modelID, modalToggle: true }));
    };

    const closeModelHandler = (res) => {
        setState((state) => ({ ...state, modalToggle: false }));
        res && pullModel();
    };

    const title = state.userId ? 'Update Model' : 'Add Model';

    return (
        <div className="model-screen">
            <Breadcrumbs separator=">>" aria-label="breadcrumb">
                <Link color="inherit" to={'/'}>
                    Home
                </Link>
                <Typography color="secondary">Vehicle</Typography>
                <Typography color="secondary">Model</Typography>
            </Breadcrumbs>
            <AddButton onClick={handleUpdate} className="add_btn" />
            <DataGrid
                columns={columns}
                className="custom-scroll"
                rows={state.List}
                rowHeight={70}
                height={500}
                enableSearch={true}
                loadingData={state.showLoader}
                isRowHovered={true}
            />
            {state.modalToggle ? (
                <DialogComp title={title} onClose={closeModelHandler} maxWidth="lg">
                    <AddEditModel modelId={state.userId} onClose={closeModelHandler} />
                </DialogComp>
            ) : null}
        </div>
    );
};

export default ModelScreen;
