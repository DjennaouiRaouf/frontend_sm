import * as React from "react";
import { Button, ButtonGroup, Dropdown} from "react-bootstrap";

import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useMemo, useRef, useState} from "react";
import DisplayDataGridModal from "../../../DisplayDataGridModal/DisplayDataGridModal";
import {ColDef, GridApi, RowNode} from "ag-grid-community";
import {useModal} from "../../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../../FilterModal/FilterModal";
import bill from "../../../icons/bill.png"
import * as XLSX from "xlsx";
import DisplayRow from "../../../ActionRenderer/DisplayRow/DisplayRow";
import numeral from "numeral";
import RecupCaution from "../../../ActionRenderer/RecupCaution/RecupCaution";
import AlertMessage from "../../../AlertMessage/AlertMessage";
import caution from "../../../icons/risk.png";

type ListCautionsProps = {
  //
};


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  const[typeC,setTypeC]=useState<string>("")
  const[typeA,setTypeA]=useState<string>("")

  const getLibC = async() => {
    if(props.colDef.field === "type"){
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getlibcaut/?id=${value}`,{
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
          'Content-Type': 'application/json',

        },
      })
          .then((response:any) => {
            setTypeC(response.data[0].libelle)
          })
          .catch((error:any) => {
          });


    }

  }

  const getLibA =async () => {
    if(props.colDef.field === "avance"){

      if(value!=null){
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getlibav/?id=${1}`,{
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
            'Content-Type': 'application/json',

          },
        })
            .then((response:any) => {
              setTypeA(response.data[0].libelle)
            })
            .catch((error:any) => {
            });


      }else{
        setTypeA('-')
      }


    }
  }
  useEffect(() => {

    getLibC()
  },[typeC]);
  useEffect(() => {
    getLibA()
  },[typeA]);

  switch (props.column.colId) {
    case 'avance' :
      return <span>{typeA }</span>
      
    case 'type' :
      return <span>{typeC}</span>
      
    case 'montant' :
      return <span>{numeral(value).format('0,0.00').replace(',',' ').replace('.',',')+' DA'}</span>
    case 'taux' :
      return <span>{value+' %'}</span>



    default:
      return <span>{value}</span>
  }

};

const ListCautions: React.FC<any> = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
  const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
  const gridRef = useRef(null);
  const[rows,setRows]=useState <any[]>([]);
  const[cols,setCols]=useState <any[]>([]);
  const { openModal } = useModal();
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const[models,setModels]=useState<string>('')
  const[pk,setPk]=useState<string>('')

  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const { mid } = useParams();

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/cautionfields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setModels(response.data.models)
          setPk(response.data.pk)

          const updatedCols:any[] = [
            {
              headerName:'Afficher',
              cellRenderer:DisplayRow,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk
              },
              pinned:"left"

            },
              ...response.data.fields,
            {
              headerName:'Recuperer',
              cellRenderer:RecupCaution,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,
                updateRows:getRows,
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
    minWidth: 200,
    cellStyle: { textAlign: 'start', border: "none"  },

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
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getcautions/?marche=${mid}${url.replace('?',"&")}`,{
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
    if (rows.length > 0 ){
      const currentDate = new Date();
      const yearString = currentDate.getFullYear().toString();
      const monthString = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const dayString = currentDate.getDate().toString().padStart(2, '0');

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `Avances_${yearString}-${monthString}-${dayString}.xlsx`);
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


  const getRowStyle = (params: any):any => {
    if (params.data.est_recupere ) {
      return {background:"#dff0d8"};
    }
    else {
      return { background: '#f2dede' };

    }


  }


  useEffect(() => {
    getCols();
  },[]);

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

  // get rows and cold dqe
  /* <DataGrid img={agreement} title={"DQE"} endpoint_cols={"/forms/dqefields/?flag=l"} endpoint_rows={"/sm/getmdqe/"+mid.pkValue+"/"} />*/


//  <FilterModal img={bill} title={"Rechercher un paiement"} endpoint_fields={"/forms/encaissementfilterfields/"} filter={getRows}  />
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


                      <div className="card mb-5 " style={{ width: "40%",background:'#ebebeb' }}>
                        <div className="card-body text-center">
                          <h5 className="text-center card-title">Caution du Marché</h5>
                          <h5 className="text-center card-title">{`N° : ${mid}` }</h5>
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

                                  <Dropdown.Item onClick={export_xlsx}>
                                    <i className="bi bi-filetype-xlsx"></i>
                                    &nbsp;Exporter les Cautions</Dropdown.Item>
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
                        <div className="card-body d-xl-flex justify-content-xl-start">
                          <label className="form-label" style={{ width: "100%" }}>
                            <i className="fas fa-circle" style={{ color: "#f2dede", marginRight: 5 }} />
                            Les cautions non récupérées
                          </label>
                          <label className="form-label" style={{ width: "100%" }}>
                            <i
                                className="fas fa-circle"
                                style={{
                                  color: "#dff0d8",
                                  marginRight: 5,
                                  borderRadius: 0,
                                  fontSize: 16
                                }}
                            />
                            Les cautions récupérées
                          </label>
                        </div>

                        <>
                          <DisplayDataGridModal img={caution} title={"Caution"} cols={cols}   />

                          <div style={containerStyle}>

                            <div style={{ width:"100%", height: '650px', boxSizing: 'border-box' }}>
                              <div style={gridStyle} className="ag-theme-alpine  " >
                                <AgGridReact ref={gridRef}
                                             rowData={rows} columnDefs={cols}
                                             onGridReady={onGridReady}
                                             gridOptions={gridOptions}
                                             onSelectionChanged={onSelectionChanged}
                                             getRowStyle={getRowStyle}



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

export default ListCautions;




