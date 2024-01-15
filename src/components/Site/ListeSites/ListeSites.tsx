import * as React from "react";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {ModalProvider, useModal} from "../../Context/FilterModalContext/FilterModalContext";
import {useNavigate} from "react-router-dom";
import hook from '../../icons/hook.png';
import FilterModal from "../../FilterModal/FilterModal";
import customer from "../../icons/customer.png";
import DisplayDataGridModal from "../../DisplayDataGridModal/DisplayDataGridModal";
import axios from "axios";
import Cookies from "js-cookie";
import ActionRenderer from "../../ActionRenderer/ActionRenderer";
import {useEffect, useMemo, useRef, useState} from "react";
import {ColDef} from "ag-grid-community";
import * as XLSX from 'xlsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
type ListeSitesProps = {
  //
};

const ListeSites: React.FC<any> = () => {
  const navigate=useNavigate();
  const { openModal } = useModal();
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);


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

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/sitefields/?flag=l`,{
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
              img:customer,
              title:"Clients",
            }
          }];

          setCols(updatedCols);



        })
        .catch((error:any) => {

        });

  }



  const getRows = async(url:string) => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getsites/?${url}`,{
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

  const export_xlsx = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'site.xlsx');
  }



  useEffect(() => {
    getCols();
  },[]);
  useEffect(() => {
    getRows("");
  },[]);






  return (
      <>
        <FilterModal img={hook} title={"Rechercher un Site"} endpoint_fields={"/forms/sitefilterfields/"} filter={getRows}  />
        <div id="wrapper" >
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" >
              <div className="container-fluid" >
                <div className="card shadow" >
                  <div className="card-body" >

                    <div className="card" style={{ height:'60px',width: "40%",background:'#ebebeb' }}>
                      <div className="card-body text-center">
                        <h4 className="text-center card-title">Liste des sites</h4>
                      </div>
                    </div>
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

                            <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                    onClick={() => navigate('/ajout_s')}>
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
                                <Dropdown.Item >
                                  <i className="bi bi-file-earmark-pdf-fill"></i>
                                  &nbsp;pdf</Dropdown.Item>
                                <Dropdown.Item  onClick={export_xlsx}>
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
                        <DisplayDataGridModal  img={hook} title={"Site"} cols={cols}   />

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
  );
};

export default ListeSites;
