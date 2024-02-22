import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';

import {Button, ButtonGroup, Dropdown, Form, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate, useSearchParams} from "react-router-dom";

import agreement from '../../icons/agreement.png'
import {useModal} from "../../Context/FilterModalContext/FilterModalContext";
import {ColDef} from "ag-grid-community";
import axios from "axios";
import Cookies from "js-cookie";

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
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";
import ODS from "../../ActionRenderer/ODS/ODS";
import Editer from "../../ActionRenderer/Editer/Editer";
import AlertMessage from "../../AlertMessage/AlertMessage";

import {showAlert, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";
import {useDispatch} from "react-redux";
import numeral from "numeral";
import Flash from "../../ActionRenderer/Flash/Flash";




const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  const[libelle,setLibelle]=useState<string>("")
  const getLib = async() => {
    if(props.data.unite){
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getlibum/?id=${props.data.unite}`,{
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
          'Content-Type': 'application/json',

        },
      })
          .then((response:any) => {
            setLibelle(response.data[0].libelle)
          })
          .catch((error:any) => {
          });


    }
  }
  useEffect(() => {
    getLib();
  },[libelle]);
  switch (props.column.colId) {

    case 'ht' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;
    case 'ttc' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;
    case 'rg':
      return <span>{value+" %"}</span>
      break;
    case 'rabais':
      return <span>{value+" %"}</span>
      break;

    default:
      return <span>{value}</span>
  }

};


const ListMarche: React.FC<any> = () => {
  const navigate=useNavigate();
  const { openModal } = useModal();
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);
  const[pk,setPK]=useState('');
  const[rowData,setRowData]=useState<any>({});
  const [shown, setShown] = useState(false);

  const dispatch = useDispatch();
  const handleClose = () => setShown(false);
  const handleShow = () => setShown(true);

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 200,
    autoHeight: true, wrapText: true,
    cellStyle: {textAlign: 'start', border: "none"},

  };
  const [searchParams] = useSearchParams();



  const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    multiSortKey:'ctrl',
    animateRows:true,
    components: {
      InfoRenderer: InfoRenderer,
    },

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


  const getRows = async(url:string) => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getmarche/${url}`,{
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

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/marchefields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setPK(response.data.pk)
          const updatedCols:any[] = [
            {
              headerName:'Afficher',
              cellRenderer:DisplayRow,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,
              },
              pinned:"left",
            }
              ,...response.data.fields,
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
              headerName:'Ordre de service',
              cellRenderer:ODS,
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
            {
              headerName:'Flash/Attachements',
              cellRenderer:Flash,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,
                onOpenModal:handleShow,
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
              headerName:'Editer',
              cellRenderer:Editer,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,
                updateRows:getRows,

              }
            },
          ]

          setCols(updatedCols);



        })
        .catch((error:any) => {

        });

  }




  const[selectedMonth,setSelectedMonth]=useState<string>("")

  useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    // Build the query string
    const queryString = paramsArray.reduce((acc, [key, value], index) => {
      if (index === 0) {
        return `?${key}=${encodeURIComponent(value)}`;
      } else {
        return `${acc}&${key}=${encodeURIComponent(value)}`;
      }
    }, '');

    getRows(queryString);
  },[searchParams]);

  useEffect(() => {
    getCols();
  },[]);


  const { permission } = useContext(PermissionContext);
  const export_xlsx = () => {
    if (rows.length > 0 ){
      const currentDate = new Date();
      const yearString = currentDate.getFullYear().toString();
      const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayString = currentDate.getDate().toString().padStart(2, '0');

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `Marchés_${yearString}-${monthString}-${dayString}.xlsx`);
    }


  }
  const handleRowClick = (event: any) => {
    setRowData(event.data);

  };

  const handleChangeMonth = (e:any) => {
      setSelectedMonth(e.target.value)
  }
  const handleFlash = () => {

    if(selectedMonth){
      const date:any[]=selectedMonth.split('-')
      navigate('liste_flash', {state: {
        marche:rowData.id,
        code_site: rowData.code_site,
        nt:rowData.nt,
          month:date[1],
          year:date[0]}})

    }
    else{
      handleClose();
      dispatch(showAlert({variant:Variants.DANGER,heading:"Attachement",text:'Veuillez inserer le mois'}))
      setSelectedMonth('')
    }

  }
  
  const handleListAtt = () => {
    if(selectedMonth){
      const date:any[]=selectedMonth.split('-')
      navigate('liste_att', {state: {
          marche:rowData.id,
          code_site: rowData.code_site,
          nt:rowData.nt,
          month:date[1],
          year:date[0]}})

    }
    else{
      handleClose();
      dispatch(showAlert({variant:Variants.DANGER,heading:"Attachement",text:'Veuillez inserer le mois'}))
      setSelectedMonth('')
    }
    
  }

  return (
      <>
        <AlertMessage/>
        <FilterModal img={agreement} title={"Rechercher un marche"} endpoint_fields={"/forms/marchefilterfields/"}  />
        <div id="wrapper" >
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" >
              <div className="container-fluid" >
                <div className="card shadow" >
                  <div className="card-body" >
                    <div className="card mb-5 " style={{ width: "40%",background:'#ebebeb' }}>
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
                                    onClick={() => navigate('/marche/ajout_m')}>
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

                                <Dropdown.Item onClick={export_xlsx}>
                                  <i className="bi bi-filetype-xlsx"></i>
                                  &nbsp;Exporter les marchés</Dropdown.Item>
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
                                           onRowClicked={handleRowClick}


                              />
                              <Modal show={shown} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Selectionner le mois</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form.Control
                                      required
                                      className="w-100 mb-3 mt-3"
                                      type="month"
                                      onChange={(e)=>handleChangeMonth(e)}


                                  />
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }}
                                  onClick={handleFlash}>
                                    <i className="fa fa-send" style={{marginRight:5 }} ></i>
                                    Liste des Flash
                                  </Button>
                                  <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }}
                                          onClick={handleListAtt}>
                                    <i className="fas fa-list" style={{marginRight:5 }} ></i>
                                    Liste des Attachements
                                  </Button>

                                </Modal.Footer>
                              </Modal>
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
