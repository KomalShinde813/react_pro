import { useEffect, useState } from "react";
import { DataGrid, InputPassword, InputText } from "../../../Core/Controls";



const columns = [
    { key: 'id', name: 'ID', width: 130, formatter({ row }) { return <>ID value is: {row.id}</>; } },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' }];

const dummyData = [
    { id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 },
    { id: 0, title: 'row2', count: 20 }, { id: 1, title: 'row2', count: 40 }, { id: 2, title: 'row2', count: 60 },
    { id: 0, title: 'row3', count: 20 }, { id: 1, title: 'row3', count: 40 }, { id: 2, title: 'row3', count: 60 },
    { id: 0, title: 'row4', count: 20 }, { id: 1, title: 'row4', count: 40 }, { id: 2, title: 'row4', count: 60 }
];

const HelpComponent = props => {
    const [state, setState] = useState({ gridRow: [], showLoader: true });
    useEffect(() => {
        setTimeout(() => {
            setState(st => ({
                ...st,
                showLoader: false,
                gridRow: dummyData
            }))
        }, 1000);
    }, []);
    return <div style={{ padding: 8 }}>
        Help Component
        <br /><br />Text Box:<br />
        <InputText label="Name" />
        <br /><br />Password Box:<br />
        <InputPassword label="Password" />
        <br /><br />Grid:<br />
        <DataGrid
            rows={state.gridRow}
            columns={columns}
            height={250}
            searchBoxClassName='data-grid-search-box'
            enableSearch={true}
            loadingData={state.showLoader} />
    </div>
}


export default HelpComponent;