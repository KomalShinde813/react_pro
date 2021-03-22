import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import { EvenSpaceButtonGroup } from '../../Core/ButtonGroup';
import { getWorkflows } from '../../Core/Service/workflow-service';
import { getWorkflowJobs } from '../../Core/Service/workflowJobs-service';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './dashboard.scss';

const Arrow = props => {
  return <Link to={`/Job/${props.id}`}>
    <IconButton size="small" >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  </Link>
}

const getClass = params => {
  const dtDueIn = moment(params.row.dateDueIn);
  const daysPast = moment().diff(dtDueIn, 'days');
  if (daysPast > 40) {
    return 'days-past-due-date-in-40';
  } else if (daysPast > 5) {
    return 'days-past-due-date-in-5';
  }
}
const columns = [
  { field: 'wipNo', headerName: 'WIP Number', width: 130 },
  { field: 'customerName', headerName: 'Customer Name', width: 190 },
  { field: 'registration', headerName: 'Vehicle Reg', width: 130 },
  { field: 'chassisNumber', headerName: 'Chassis Number', width: 200 },
  { field: 'branchShortName', headerName: 'Branch', width: 130 },
  {
    field: 'dateDueIn', headerName: 'Date Due In', width: 120,
    valueGetter: params => moment(params.value).format("DD/MM/YYYY")
  },
  { field: 'franchiseName', headerName: 'Franchise', width: 180 },
  { field: 'makeModel', headerName: 'Model', width: 180 },
  { field: 'accountNo', headerName: 'Account', width: 110 },

  {
    field: '',
    headerName: '',
    sortable: false,
    width: 50,
    renderCell: params => <Arrow id={params.getValue('id')} />,
  },
].map(c => ({ ...c, cellClassName: getClass }));

let Dashboard = props => {
  const [state, setState] = useState({
    workflowButtons: [],
    rows: [],
    totalRec: 0
  })
  useEffect(async () => {
    let res = await getWorkflows();
    if (res.success) {
      const buttons = res.data.map(w => ({ id: w.id, label: w.workflowName }));
      setState(st => ({ ...st, workflowButtons: buttons }));
    }
  }, []);
  const buttonClicked = async btn => {
    let res = await getWorkflowJobs(btn.id);
    if (res.success) {
      setState(st => ({ ...st, ...res.data }));
    }
  }
  return (
    <>
      <EvenSpaceButtonGroup buttons={state.workflowButtons} color="secondary" onClick={buttonClicked} />
      <div style={{ height: 'calc(100vh - 200px)', width: '100vw' }} >
        <DataGrid rows={state.rows} headerHeight={30} rowHeight={30} hideFooter={true} columns={columns} pageSize={100} disableColumnMenu={true} showColumnRightBorder={true} />
      </div>
    </>
  );
}
export default Dashboard;