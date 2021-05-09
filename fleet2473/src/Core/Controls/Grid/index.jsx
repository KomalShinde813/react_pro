import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import { InputText } from '..';
import { some } from 'lodash';

const EmptyRowsRenderer = (props) => {
    return <div className="empty-row">{props.loadingData ? <CircularProgress color="inherit" /> : <span>No Data Found.</span>}</div>;
};

const useStyles = makeStyles((theme) => {
    return {
        gridContainer: {
            margin: theme.spacing(1),
            '& .empty-row': {
                marginTop: theme.spacing(2),
                textAlign: 'center'
            },
            '& .grid-filter': {
                position: 'relative',
                display: 'inline-block',
                '& > label': {
                    position: 'absolute',
                    right: 10,
                    top: 8,
                    zIndex: -99,
                    color: '#d3d3d3'
                }
            }
        }
    };
});

let searchTimer;
let defaultRowHeight = 45;
const DataGrid = (props) => {
    const [state, setState] = useState({
        rows: [],
        filteredRows: [],
        filterText: '',
        rowHeight: defaultRowHeight
    });
    const classes = useStyles();

    useEffect(() => {
        const rows = props.rows || [];
        const rowHeight = props.rowHeight || defaultRowHeight;
        setState((st) => ({ ...st, rows, rowHeight }));
    }, [props.rows, props.rowHeight]);

    const { columns } = props;

    const gridStyle = useMemo(() => {
        return {
            height: props.height || 350,
            width: props.width || 'auto',
            marginTop: props.enableSearch ? 8 : 0
        };
    }, [props.height, props.width, props.enableSearch]);

    const setFilterText = (e) => {
        const vl = e.target.value;
        setState((st) => ({ ...st, filterText: vl }));
        searchTimer && clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            setFilteredRow();
        }, 500);
    };

    const setFilteredRow = () => {
        setState((st) => {
            const newSt = { ...st };
            const { rows, filterText } = newSt;
            let filterd = [];
            if (props.enableSearch && filterText.length > 0) {
                filterd = rows.filter((rw) => some(rw, (vl) => `${vl}`.toLowerCase().includes(filterText.trim().toLowerCase())));
            } else {
                filterd = [...rows];
            }
            newSt.filteredRows = filterd;
            return newSt;
        });
    };

    useEffect(() => {
        setFilteredRow();
    }, [state.rows]);

    return (
        <div className={classes.gridContainer}>
            {props.enableSearch && (
                <div className="grid-filter">
                    <InputText label="Search" onChange={setFilterText} value={state.filterText} autoFocus={true} className={props.searchBoxClassName || ''} />
                    <label>
                        Showing {state.rows.length ? `${state.filteredRows.length}/` : ``}
                        {state.rows.length}
                    </label>
                </div>
            )}
            <ReactDataGrid
                columns={columns}
                rows={state.filteredRows}
                emptyRowsRenderer={() => EmptyRowsRenderer(props)}
                rowHeight={state.rowHeight}
                className="custom-scroll"
                style={gridStyle}
            />
        </div>
    );
};

export default DataGrid;
