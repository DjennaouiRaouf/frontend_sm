import React, {useEffect, useMemo, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";


const ListClients: React.FC<any> = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [paginationPageSize, setPaginationPageSize] = useState(20); // Initial page size
    const [clients, setClients] = useState<any[]>([]);
    const getClients = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getclients/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {
                setClients(response.data);
            })
            .catch((error:any) => {
                //toast.current?.show({ severity: 'error', summary: 'Client', detail: String(error.response.data.detail), life: 3000 });
            });
    }
    useEffect(() => {
        getClients()
    },[clients])

    const columnDefs:any = [

        {
            field: ' ',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
          { headerName: 'code', field: 'code_client',  cellStyle: { textAlign: 'start'  },resizable: true },
          { headerName: 'libelle', field: 'libelle_client',  cellStyle: { textAlign: 'start' },resizable: true },
          { headerName: 'nif', field: 'nif',  cellStyle: { textAlign: 'start' },resizable: true },
        { headerName: 'raison social', field: 'raison_social',  cellStyle: { textAlign: 'start' },resizable: true },

  ];

  const rowData = [
    // Your data goes here
      { id: 1, name: 'John Doe' },
]
    const onPageSizeChanged = (newPageSize:any) => {
        setPaginationPageSize(newPageSize);
    };

    const gridOptions:any = {
        pagination: true,
        domLayout: 'autoHeight', // or 'autoHeight' for auto-sizing
        paginationPageSize: paginationPageSize,
        onPageSizeChanged: onPageSizeChanged,
    };


    return (
        <>
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 text-nowrap">
                                            <div
                                                id="dataTable_length"
                                                className="dataTables_length"
                                                aria-controls="dataTable"
                                            />
                                            <Form.Select className="form-control-user" style={{ height: 35 ,width:120 }} aria-label="Default select example" onChange={(e) => onPageSizeChanged(Number(e.target.value))} value={paginationPageSize}>
                                                <option value="20">20</option>
                                                <option value="40">40</option>
                                                <option value="60">60</option>
                                                <option value="80">80</option>
                                                <option value="100">100</option>
                                            </Form.Select>

                                        </div>
                                        <div className="col-md-6">
                                            <div id="dataTable_filter" className="text-md-end dataTables_filter">
                                                <button className="btn btn-primary btn-sm" type="button" style={{ height: 35 }}>
                                                    <i className="fas fa-search" />
                                                    &nbsp;Recherche
                                                </button>


                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id="dataTable"
                                        className="table-responsive table mt-2"
                                        role="grid"
                                        aria-describedby="dataTable_info"
                                    >
                                        <div style={containerStyle}>
                                            <div style={{ width:"100%", height: '100%', boxSizing: 'border-box' }}>

                                                <div style={gridStyle} className="ag-theme-alpine  ">
                                                    <AgGridReact rowData={rowData} columnDefs={columnDefs}
                                                                 pagination={gridOptions.pagination}
                                                                 domLayout={gridOptions.domLayout}
                                                                 paginationPageSize={gridOptions.paginationPageSize}
                                                                 rowSelection={'multiple'}
                                                                 suppressRowClickSelection={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>


  );
};

export default ListClients;
