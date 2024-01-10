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
import {ColDef, GridApi, RowNode} from "ag-grid-community";
import {useModal} from "../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../FilterModal/FilterModal";
import customer from "../../icons/customer.png";
import * as XLSX from "xlsx";

type ListDQEProps = {
  //
};

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  const[libelle,setLibelle]=useState<string>("")
  const getLib = async() => {
    if(props.column.colId === 'unite'){
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getlibum/?id=${value}`,{
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
  if(props.column.colId === 'unite')
    return <span>{libelle}</span>
  else
    return <span>{value}</span>

};
const ListDQE: React.FC<any> = () => {
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
  const location = useLocation();
  const mid = location.state;

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

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqefields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setModels(response.data.models)
          setPk(response.data.pk)

          const updatedCols:any[] = [...response.data.fields, {
            headerName:'Action',
            cellRenderer:ActionRenderer,
            cellRendererParams:{
              modelName:response.data.models,
              pk:response.data.pk,
              customMethod:getRows
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
    rowSelection:'multiple',
    components: {
      InfoRenderer: InfoRenderer,
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
      XLSX.writeFile(wb, `DQE_${yearString}-${monthString}-${dayString}.xlsx`);
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
  const delSelected = async() => {
    const pks:any[]=[]
    const myDictionary: { [key: string]: any } = {};
    selectedRows.forEach(obj => {

        pks.push(obj[pk])


    });
    const pkList:any={}
    pkList[pk]=pks
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sm/deldqe/`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
      data: pkList,

    })
        .then((response:any) => {

          getRows("");



        })
        .catch((error:any) => {

        });

    setSelectedRows([])
  }
  
  const displayDeleted = async() => {

    navigate('/del_dqe', { state: { marche: mid.marche } })
  }
  useEffect(() => {
    getRows("");
  },[]);
  useEffect(() => {
    getCols();
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
                              <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                      onClick={openModal}>
                                <i className="fas fa-filter" />
                                &nbsp;Recherche
                              </Button>

                              <Dropdown>
                                <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 35 , background: "#df162c", borderWidth: 0
                                  ,borderRadius:0}} id="dropdown-basic"
                                >
                                  <i className="far fa-trash-alt"></i>
                                  &nbsp;Supprimer
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={delSelected}>
                                    <i className="fas fa-eraser"></i>
                                    &nbsp;Suppression</Dropdown.Item>
                                  <Dropdown.Item onClick={displayDeleted}>
                                    <i className="far fa-trash-alt"></i>
                                    &nbsp;Corbeille</Dropdown.Item>
                                  <Dropdown.Item onClick={export_xlsx}>
                                    <i className="fas fa-list-ul"></i>
                                    &nbsp;Elements supprimés</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>



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
                          <DisplayDataGridModal img={settings} title={"DQE"} cols={cols}   />

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

export default ListDQE;
