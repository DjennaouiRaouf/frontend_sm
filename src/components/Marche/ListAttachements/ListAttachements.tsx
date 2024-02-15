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

import {useContext, useEffect, useMemo, useRef, useState} from "react";
import DisplayDataGridModal from "../../DisplayDataGridModal/DisplayDataGridModal";
import settings from "../../icons/settings.png";
import {ColDef, GridApi, RowNode} from "ag-grid-community";
import {useModal} from "../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../FilterModal/FilterModal";
import customer from "../../icons/customer.png";
import * as XLSX from "xlsx";
import DisplayRow from "../../ActionRenderer/DisplayRow/DisplayRow";
import DQEAction from "../../ActionRenderer/DQEAction/DQEAction";
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";
import numeral from 'numeral';
import AlertMessage from "../../AlertMessage/AlertMessage";
type ListAttachementsProps = {
  //
};

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  const[libelle,setLibelle]=useState<string>("")
  const getLib = async() => {

  }
  useEffect(() => {
    getLib();
  },[libelle]);
  switch (props.column.colId) {


    case 'montant_precedent' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;
    case 'montant_cumule' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;

    case 'montant_mois' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;
    case 'prix_u' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;

    default:
      return <span>{value}</span>
  }

};

const ListAttachements: React.FC<any> = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);
  const[cols2,setCols2]=useState <any[]>([]);
  const { openModal } = useModal();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const[models,setModels]=useState<string>('')
  const[pk,setPk]=useState<string>('')
  const navigate=useNavigate();
  const location = useLocation();
  const mid = location.state;


  const getRows = async(url:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getatt/?marche=${mid.marche}&mm=${mid.month}&aa=${mid.year}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          setRows(response.data.attachement);


        })
        .catch((error:any) => {

        });

  }

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/attfields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setModels(response.data.models)
          setPk(response.data.pk)
          setCols2(response.data.fields2)
          const updatedCols:any[] = [...response.data.fields,
            {
              headerName:'Visualiser',
              cellRenderer:DisplayRow,
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

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 300,
    cellStyle: { textAlign: 'start', border: "none"  },
    autoHeight: true, wrapText: true,

  };



  const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    multiSortKey:'ctrl',
    animateRows:true,
    rowSelection:'multiple',
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




  const export_xlsx = () => {
    if (rows.length > 0 ){
      const currentDate = new Date();
      const yearString = currentDate.getFullYear().toString();
      const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayString = currentDate.getDate().toString().padStart(2, '0');

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `DecompteProvisoir_${yearString}-${monthString}-${dayString}.xlsx`);
    }

  }



  const onGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes: any[] = gridApi.getSelectedNodes();
      const selectedData: any[] = selectedNodes.map((node) => node.data);
      setSelectedRows(selectedData);
    }
  };


  useEffect(() => {
    getRows("");
  },[]);
  useEffect(() => {
    getCols();
  },[]);

  const print_dec = () => {
    navigate('print_dec', { state: { params:location.state,is_att:false} }) // decompte prov
  }
  const print_att = () => {
    navigate('print_att', { state: { params:location.state,is_att:true} }) // attachement
  }
  const { permission } = useContext(PermissionContext);

  return (
      <>
        <>
          <AlertMessage/>

          <div id="wrapper" >
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content" >
                <div className="container-fluid" >
                  <div className="card shadow" >
                    <div className="card-body" >

                      <div className="card" style={{ height:'90px',width: "40%",background:'#ebebeb' }}>
                        <div className="card-body text-center">
                          <h5 className="text-center card-title">Attachement du marche</h5>
                          <h5 className="text-center card-title">{`N° : ${mid.marche}` }</h5>
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
                                  <Dropdown.Item onClick={print_att}>
                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                    &nbsp;Imprimer l'attachement</Dropdown.Item>
                                  <Dropdown.Item onClick={print_dec}>
                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                    &nbsp;Imprimer le Décompte provisoire</Dropdown.Item>
                                  <Dropdown.Item onClick={export_xlsx}>
                                    <i className="bi bi-filetype-xlsx"></i>
                                    &nbsp;Exporter le Décompte provisoire</Dropdown.Item>
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
                          <DisplayDataGridModal img={settings} title={"Attachement"} cols={cols2}   />

                          <div style={containerStyle}>

                            <div style={{ width:"100%", height: '650px', boxSizing: 'border-box' }}>
                              <div style={gridStyle} className="ag-theme-alpine  " >
                                <AgGridReact ref={gridRef}
                                             rowData={rows} columnDefs={cols}
                                             onGridReady={onGridReady}
                                             gridOptions={gridOptions}
                                             onSelectionChanged={onSelectionChanged}



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



export default ListAttachements;
