import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, Spinner} from "react-bootstrap";


const ListSites: React.FC<any> = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
  const [paginationPageSize, setPaginationPageSize] = useState(20); // Initial page size
  const [sites, setSites] = useState<any[]>([]);
  const gridRef = useRef(null);
  const getSites = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getsites/`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response) => {
          setSites(response.data);
        })
        .catch((error) => {
        });


  }
  useEffect(() => {

  },[])
  const onGridReady = useCallback((params:any) => {
    getSites()
  }, []);

  const columnDefs:any = [

    {
      field: ' ',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      width:50,
    },
    {field:"code_site", headerName:"code_site" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"code_filiale", headerName:"code_filiale" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"code_region", headerName:"code_region",  cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"libelle_site", headerName:"libelle_site" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"code_agence", headerName:"code_agence" , cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"type_site" ,headerName:"type_site" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"code_division" ,headerName:"code_division" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"code_commune_site" ,headerName:"code_commune_site" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"jour_cloture_mouv_rh_paie" ,headerName:"jour_cloture_mouv_rh_paie" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"date_ouverture_site" ,headerName:"date_ouverture_site" ,cellStyle: { textAlign: 'start'  },resizable: true},
    {field:"date_cloture_site" ,headerName:"date_cloture_site" ,cellStyle: { textAlign: 'start'  },resizable: true},

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
                                         rowData={sites} columnDefs={columnDefs}
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

export default ListSites;
