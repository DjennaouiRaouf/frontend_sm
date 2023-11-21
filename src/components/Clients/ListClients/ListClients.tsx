import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, Spinner} from "react-bootstrap";


const ListClients: React.FC<any> = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
    const [paginationPageSize, setPaginationPageSize] = useState(20); // Initial page size
    const [clients, setClients] = useState<any[]>([]);
    const gridRef = useRef(null);
    const getClients = async(gridRef:any) => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getclients/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {
                setTimeout(() => {
                    setClients(response.data);
                }, 2000);

            })
            .catch((error:any) => {
                //toast.current?.show({ severity: 'error', summary: 'Client', detail: String(error.response.data.detail), life: 3000 });
            }).finally(() => {

            });
    }
    useEffect(() => {

    },[])
    const onGridReady = useCallback((params:any) => {
        getClients(gridRef)
    }, []);

    const columnDefs:any = [

        {
            field: ' ',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            width:50,
        },
          { headerName: 'code', field: 'code_client',  cellStyle: { textAlign: 'start'  },resizable: true },
          { headerName: 'libelle', field: 'libelle_client',  cellStyle: { textAlign: 'start' },resizable: true },
          { headerName: 'nif', field: 'nif',  cellStyle: { textAlign: 'start' },resizable: true },
          { headerName: 'raison social', field: 'raison_social',  cellStyle: { textAlign: 'start' },resizable: true },
        { headerName: 'num registe commerce', field: 'num_registre_commerce',  cellStyle: { textAlign: 'start' },resizable: true },
        { headerName: 'est_client_cosider', field: 'est_client_cosider',  cellStyle: { textAlign: 'start' },resizable: true },

  ];


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
                                                <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}>
                                                    <i className="fas fa-search" />
                                                    &nbsp;Recherche
                                                </Button>


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
                                            <div style={{ width:"100%", height: '600px', boxSizing: 'border-box' }}>

                                                <div style={gridStyle} className="ag-theme-alpine  ">
                                                    <AgGridReact ref={gridRef}
                                                                 rowData={clients} columnDefs={columnDefs}
                                                                 pagination={gridOptions.pagination}
                                                                 domLayout={gridOptions.domLayout}
                                                                 paginationPageSize={gridOptions.paginationPageSize}
                                                                 rowSelection={'multiple'}
                                                                 suppressRowClickSelection={true}
                                                                 onGridReady={onGridReady}
                                                                 overlayNoRowsTemplate={'<div class="spinner-border text-primary" role="status">\n' +
                                                                     '  <span class="visually-hidden">Loading...</span>\n' +
                                                                     '</div>'}


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
