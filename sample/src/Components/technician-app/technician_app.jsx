import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../App/AppContext";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { EvenSpaceButtonGroup } from "../../Core/ButtonGroup";
import "./TechnicianApp_screen.scss";
import { DefaultButton } from "./../../Core/FormInput/index";
import moment from "moment";

const TechnicianApp = (props) => {
    const [state, setState] = useState({
        workflowButtons: [],
        rows: [],
        totalRec: 0,
    });
    useEffect(async () => {
        let res = await TechnicianButtons();
    }, []);

    const TechnicianButtons = () => {
        const TechButton = [
            { id: 1, ButtonsName: "Jobs Assigned To You" },
            { id: 2, ButtonsName: "Jobs Assigned To Others" },
            { id: 3, ButtonsName: "All other Jobs" },
        ];
        const buttons = TechButton.map((w) => ({
            id: w.id,
            label: w.ButtonsName,
        }));
        setState((st) => ({ ...st, workflowButtons: buttons }));
    };
    const getClass = (params) => {
        const dtDueIn = moment(params.row.datedue);
        const daysPast = moment().diff(dtDueIn, "days");
        if (daysPast > 40) {
            return "days-past-due-date-in-40";
        } else if (daysPast > 5) {
            return "days-past-due-date-in-5";
        }
    };
    const column_new = [
        { field: "id", headerName: "ID", width: 130, sortable: false },
        { field: "wipno", headerName: "Wip Number", width: 160 },
        { field: "custname", headerName: "Customer Name", width: 180 },
        { field: "vehiclereg", headerName: "Vehicle Reg", width: 160 },

        {
            field: "chassisno",
            headerName: "Chassis Number",
            width: 250,
        },
        {
            field: "branch",
            headerName: "Branch Number",
            width: 210,
        },
        {
            field: "datedue",
            headerName: "Date Due In",
            width: 210,
            valueGetter: (params) => moment(params.value).format("DD/MM/YYYY"),
        },
        {
            field: "franchisecode",
            headerName: "Franchise Code",
            width: 210,
        },
        {
            field: "model",
            headerName: "Model",
            width: 210,
        },
        {
            field: "usertype",
            headerName: "Account Code",
            width: 180,
        },
    ].map((c) => ({ ...c, cellClassName: getClass }));

    const tempRows1 = [
        {
            wipno: 123456,
            custname: "Snow",
            vehiclereg: "X4BHHK",
            branch: 12,
            chassisno: "WD6789UH67869HTYU",
            datedue: "07/03/2021",
            franchisecode: "V",
            model: "Citan 190CDI",
            usertype: "C98HB",
        },
        {
            wipno: 123456,
            custname: "Lannister",
            vehiclereg: "X8LHHK",
            branch: 12,
            chassisno: "WD6789UH67869HTYU",
            datedue: "09/03/2021",
            franchisecode: "V",
            model: "Altego 860 Rigid",
            usertype: "BO256",
        },
        {
            wipno: 125656,
            custname: "Lannister",
            vehiclereg: "J4BHHK",
            branch: 12,
            chassisno: "WD6789UH67869HTYU",
            datedue: "2/23/2021",
            franchisecode: "H",
            model: "Spinter",
            usertype: "BH678",
        },
        {
            wipno: 456123,
            custname: "Stark",
            vehiclereg: "L4BHHK",
            branch: 12,
            chassisno: "WD6789UH67869HTYU",
            datedue: "12/02/2021",
            franchisecode: "V",
            model: "Citan 190CDI",
            usertype: "JH67G",
        },
        {
            wipno: 566123,
            custname: "Targaryen",
            vehiclereg: "J4HHHK",
            branch: 12,
            chassisno: "WD6789UH67869HTYU",
            datedue: "1/12/2021",
            franchisecode: "H",
            model: "Actros 1845 LS",
            usertype: "HJ54D",
        },
        {
            wipno: 876123,
            custname: "Melisandre",
            vehiclereg: "J4HHHK",
            branch: 24,
            chassisno: "WD6789UH67869HTYU",
            franchisecode: "H",
            model: "Actros 1845 LS",
            datedue: "3/02/2021",
            usertype: "KJ789",
        },
    ];

    const rows_new = [...tempRows1, ...tempRows1].map((r, i) => ({
        ...r,
        id: i + 1,
    }));

    const { showModal } = useContext(AppContext);

    const buttonClicked = (btn) => {};

    let history = useHistory();

    return (
        <>
            <DefaultButton
                variant="contained"
                color="secondary"
                className="addbtn"
                onClick={() => history.goBack()}
            >
                Back
            </DefaultButton>
            <div className="root">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <EvenSpaceButtonGroup
                                    buttons={state.workflowButtons}
                                    color="secondary"
                                    onClick={buttonClicked}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <div
                            style={{
                                height: "calc(100vh - 192px)",
                                width: "100%",
                                margin: "10px",
                            }}
                        >
                            <DataGrid
                                rows={rows_new}
                                headerHeight={30}
                                rowHeight={30}
                                hideFooter={true}
                                columns={column_new}
                                pageSize={100}
                                disableColumnMenu={true}
                                showColumnRightBorder={true}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
export default TechnicianApp;
