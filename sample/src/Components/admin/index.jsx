import React, { useEffect, useContext } from "react";
import AppContext from "../../App/AppContext";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import { SecondaryButton } from "./../../Core/FormInput/index";
import "./admin.css";

const Admin = (props) => {
    const { loggedIn, showModal } = useContext(AppContext);
    useEffect(() => {
        if (loggedIn) {
            console.log(loggedIn);
        } else {
            props.history.push("/login");
        }
    }, []);

    const handelDeleteUser = () => {
        showModal("DeleteModal");
    };

    const handleTechWriteUpModel = () => {
        showModal("TechWriteUp");
    };
    const handleAdduserModel = () => {
        showModal("AddUser");
    };
    const Arrow = (props) => {
        return (
            <IconButton
                aria-label="delete"
                size="small"
                onClick={handelDeleteUser}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        );
    };

    const column_new = [
        { field: "id", headerName: "ID", width: 130, sortable: false },
        { field: "name", headerName: "Name", width: 130 },
        { field: "phone", headerName: "Phone Number", width: 160 },
        {
            field: "email",
            headerName: "Email",
            width: 180,
        },
        {
            field: "usertype",
            headerName: "User Type",
            width: 180,
        },

        {
            field: "",
            headerName: "",
            sortable: false,
            width: 50,

            renderCell: (params) => <Arrow />,
        },
    ];

    const tempRows1 = [
        { name: "Snow", phone: 7378312168, email: "s@gmail.com" ,usertype:"Admin"},
        { name: "Lannister", phone: 7378312168, email: "s123@gmail.com",usertype:"Customer" },
        { name: "Lannister", phone: 7378312168, email: "lann@gmail.com",usertype:"Auditor" },
        { name: "Stark", phone: 7378312168, email: "stark@gmail.com",usertype:"Internal User" },
        { name: "Targaryen", phone: 7378312168, email: null,usertype:"Customer" },
        { name: "Melisandre", phone: null, email: "john@gmail.com",usertype:"Internal User"  },
        { name: "Clifford", phone: 7378312168, email: "alex@gmail.com",usertype:"Customer" },
        { name: "Frances", phone: 7378312168, email: "s@gmail.com" ,usertype:"Auditor"},
        { name: "Roxie", phone: 7378312168, email: "s@gmail.com" ,usertype:"Customer" },
    ];

    const rows_new = [...tempRows1, ...tempRows1].map((r, i) => ({
        ...r,
        id: i + 1,
    }));

    return (
        <div>
            <Grid container className="roots">
                <Grid>
                    <div className="btn_add">
                        <SecondaryButton
                            variant="contained"
                            color="secondary"
                            onClick={handleAdduserModel}
                            className="addbtn"
                        >
                            Add user
                        </SecondaryButton>
                        <SecondaryButton
                            variant="contained"
                            color="secondary"
                            onClick={handleTechWriteUpModel}
                            className="addbtn"
                        >
                            Tech Write Up
                        </SecondaryButton>
                    </div>
                </Grid>
                {/* table start*/}
                <div style={{ height: "calc(100vh - 192px)", width: "100%", margin:"10px" }}>
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
                {/* table end*/}
            </Grid>
        </div>
    );
};
export default Admin;
