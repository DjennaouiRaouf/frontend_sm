import * as React from "react";
import {Breadcrumb, Button, ButtonGroup, Dropdown} from "react-bootstrap";

import agreement from "../../icons/agreement.png";
import {useLocation, useNavigate} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import Cookies from "js-cookie";
import ActionRenderer from "../../ActionRenderer/ActionRenderer";
import {useEffect, useMemo, useRef, useState} from "react";
import DisplayDataGridModal from "../../DisplayDataGridModal/DisplayDataGridModal";
import settings from "../../icons/settings.png";
import {ColDef} from "ag-grid-community";
import {useModal} from "../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../FilterModal/FilterModal";
import customer from "../../icons/customer.png";
type ListDQEProps = {
  //
};

const ListDQE: React.FC<any> = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);
  const { openModal } = useModal();
  const navigate=useNavigate();
  const location = useLocation();
  const mid = location.state;

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqefields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          const updatedCols:any[] = [...response.data.fields, {
            headerName:'Action',
            cellRenderer:ActionRenderer,
            cellRendererParams:{
              modelName:response.data.models,
            }
          }];

          setCols(updatedCols);



        })
        .catch((error:any) => {

        });

  }

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 300,
    cellStyle: { textAlign: 'start', border: "none"  },

  };



  const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    multiSortKey:'ctrl',
    animateRows:true,
  };


  const getRows = async(url:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getdqe/?marche__id=${mid.marche}&${url}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          setRows(response.data);



        })
        .catch((error:any) => {

        });

  }

  useEffect(() => {
    getCols();
  },[]);

  useEffect(() => {
    getRows("");
  },[]);
  // get rows and cold dqe
  /* <DataGrid img={agreement} title={"DQE"} endpoint_cols={"/forms/dqefields/?flag=l"} endpoint_rows={"/sm/getmdqe/"+mid.pkValue+"/"} />*/
  return (
      <>
        <>
          <FilterModal img={settings} title={"Rechercher un DQE"} endpoint_fields={"/forms/dqefilterfields/"} filter={getRows}  />

          <div id="wrapper" >
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content" >
                <div className="container-fluid" >
                  <div className="card shadow" >
                    <div className="card-body" >

                      <h3 className="text-dark mb-0">{"DQE du marche N° "+mid.marche}</h3>
                      <div className="row">
                        <div className="col-md-6 text-nowrap">
                          <div
                              id="dataTable_length"
                              className="dataTables_length"
                              aria-controls="dataTable"
                          />

                        </div>
                        <div className="col-md-6">
                          <div id="dataTable_filter" className="text-md-end dataTables_filter">

                            <ButtonGroup style={{ height: 35}}>

                              <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}>
                                <i className="fas fa-plus" />
                                &nbsp;Ajouter
                              </Button>
                              <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                      onClick={openModal}>
                                <i className="fas fa-filter" />
                                &nbsp;Recherche
                              </Button>
                              <Dropdown>
                                <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 35 , background: "#df162c", borderWidth: 0
                                  ,borderTopLeftRadius:0,borderBottomLeftRadius:0}} id="dropdown-basic"
                                >
                                  <i className="fas fa-print" />
                                  &nbsp;Imprimer
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                    &nbsp;pdf</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    <i className="bi bi-filetype-xlsx"></i>
                                    &nbsp;xlsx</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>

                            </ButtonGroup>




                          </div>
                        </div>
                      </div>

                      <div
                          id="dataTable"
                          className="table-responsive table mt-5 mb-3"
                          role="grid"
                          aria-describedby="dataTable_info"


                      >
                        <>
                          <DisplayDataGridModal img={settings} title={"DQE"} cols={cols}   />

                          <div style={containerStyle}>

                            <div style={{ width:"100%", height: '650px', boxSizing: 'border-box' }}>
                              <div style={gridStyle} className="ag-theme-alpine  " >
                                <AgGridReact ref={gridRef}
                                             rowData={rows} columnDefs={cols}
                                             gridOptions={gridOptions}



                                />
                              </div>
                            </div>
                          </div>
                        </>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      </>
  );
};

export default ListDQE;
