import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";

import agreement from '../../icons/agreement.png'
import {useModal} from "../../Context/FilterModalContext/FilterModalContext";
import {ColDef} from "ag-grid-community";
import axios from "axios";
import Cookies from "js-cookie";
import ActionRenderer from "../../ActionRenderer/ActionRenderer";
import customer from "../../icons/customer.png";
import * as XLSX from "xlsx";
import DisplayDataGridModal from "../../DisplayDataGridModal/DisplayDataGridModal";
import {AgGridReact} from "ag-grid-react";
import hook from "../../icons/hook.png";
import FilterModal from "../../FilterModal/FilterModal";
import DisplayRow from "../../ActionRenderer/DisplayRow/DisplayRow";
import DQE from "../../ActionRenderer/DQE/DQE";
import Facturation from "../../ActionRenderer/Facturation/Facturation";
import Avance from "../../ActionRenderer/Avance/Avance";
import Cautions from "../../ActionRenderer/Cautions/Cautions";
const ListMarche: React.FC<any> = () => {
  const navigate=useNavigate();
  const { openModal } = useModal();
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);
  const[filter,setFilter]=useState('');

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
    localeText: {
      // Default pagination text
      page: 'Page',
      to: 'à',
      of: 'sur',
      nextPage: 'Suivant',
      lastPage: 'Dernier',
      firstPage: 'Premier',
      previousPage: 'Precedent',

      loadingOoo: 'Chargement...',
      noRowsToShow: 'Pas de Données',

      // Add more custom texts as needed
    },
  };

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/marchefields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          const updatedCols:any[] = [...response.data.fields, {
            headerName:'Afficher',
            cellRenderer:DisplayRow,
            cellRendererParams:{
              modelName:response.data.models,
              pk:response.data.pk,
            }
          },

            {
              headerName:'DQE',
              cellRenderer:DQE,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,
                endpoint_upload:'/sm/importdqe/',
                endpoint_download:'/sm/getdqe/',
              }
            },
            {
              headerName:'Facturation',
              cellRenderer:Facturation,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,

              }
            },
            {
              headerName:'Avances',
              cellRenderer:Avance,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,

              }
            },
            {
              headerName:'Cautions',
              cellRenderer:Cautions,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,

              }
            },


          ];

          setCols(updatedCols);



        })
        .catch((error:any) => {

        });

  }



  const getRows = async(url:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getmarche/?${url}`,{
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


  const export_xlsx = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'nt.xlsx');
  }


  return (
      <>
        <FilterModal img={agreement} title={"Rechercher un marche"} endpoint_fields={"/forms/marchefilterfields/"} filter={getRows}  />
        <div id="wrapper" >
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" >
              <div className="container-fluid" >
                <div className="card shadow" >
                  <div className="card-body" >
                    <div className="card" style={{ height:'60px',width: "40%",background:'#ebebeb' }}>
                      <div className="card-body text-center">
                        <h4 className="text-center card-title">Liste des marchés</h4>
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
                                    onClick={() => navigate('/ajout_m')}>
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
                                <Dropdown.Item onClick={export_xlsx}>
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
                        <DisplayDataGridModal img={agreement} title={"Marché"} cols={cols}   />

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

export default ListMarche;
