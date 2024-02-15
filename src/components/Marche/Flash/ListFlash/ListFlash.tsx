import * as React from "react";
import {Breadcrumb, Button, ButtonGroup, Dropdown, Form, Modal} from "react-bootstrap";

import agreement from "../../icons/agreement.png";
import {useLocation, useNavigate} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import Cookies from "js-cookie";

import {useContext, useEffect, useMemo, useRef, useState} from "react";
import DisplayDataGridModal from "../../../DisplayDataGridModal/DisplayDataGridModal";

import {ColDef, GridApi, RowNode} from "ag-grid-community";
import {useModal} from "../../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../../FilterModal/FilterModal";
import customer from "../../../icons/customer.png";
import * as XLSX from "xlsx";
import DisplayRow from "../../../ActionRenderer/DisplayRow/DisplayRow";
import {PermissionContext} from "../../../Context/PermissionContext/PermissionContext";
import numeral from 'numeral';
import AlertMessage from "../../../AlertMessage/AlertMessage";
import {useDispatch} from "react-redux";
import Attacher from "../../../ActionRenderer/Attacher/Attacher";
import {showAlert, Variants} from "../../../../Redux-Toolkit/Slices/AlertSlice";

type ListFlashProps = {
  //
};

interface Opt {
  value:boolean;
  label:string;
}
const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'quantite_1':
      return <span>{value}</span>
      break;
    case 'valeur_1' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;
    case 'quantite_2':
      return <span>{value}</span>
      break;
    case 'valeur_2' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;

    case 'quantite_3':
      return <span>{value}</span>
      break;
    case 'valeur_3' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
      break;

    default:
      return <span>{value}</span>
  }

};

const ListFlash: React.FC<any> = () => {
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
  const [shown, setShown] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShown(false);
  const handleShow = () => setShown(true);
  const[rowData,setRowData]=useState<any>({});
  const[attachementFields,setAttachementFields]=useState<any[]>([])

  const getRows = async(url:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sch/getprod/?code_site=${mid.code_site}&nt=${mid.nt}&prevu_realiser=R&code_type_production=01&mm=${mid.month}&aa=${mid.year}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          console.log(response.data)
          setRows(response.data);


        })
        .catch((error:any) => {

        });

  }

  const getCols = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/flashfields/?flag=l`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setModels(response.data.models)
          setPk(response.data.pk)

          const updatedCols:any[] = [...response.data.fields,
            {
              headerName:'Visualizer',
              cellRenderer:DisplayRow,
              cellRendererParams:{
                modelName:response.data.models,
                pk:response.data.pk,


              }
            },
            {
              headerName:'Attacher',
              cellRenderer:Attacher,
              cellRendererParams:{
                onOpenModal:handleShow,
              }
            },


          ];

          setCols(updatedCols);



        })
        .catch((error:any) => {

        });

  }


  const getAttachementFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/attfields/?flag=f`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setModels(response.data.models)
          setPk(response.data.pk)
          setAttachementFields(response.data.fields);
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


  const handleRowClick = (event: any) => {
    setRowData(event.data);
    setFormData({
      qte_mois:event.data.quantite_1,
      montant_mois:event.data.valeur_1,
      date:event.data.mmaa,

    })




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


  useEffect(() => {
    getRows("");
  },[]);
  useEffect(() => {
    getCols();
  },[]);



  const envoyer = async() => {
    const dqe:string=rowData.code_tache

    formData["dqe"]=dqe
    delete formData["montant_mois"]
    console.log(formData)

    const formDataObject = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObject.append(key, formData[key]);
      }
    }


    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addatt/`,formDataObject,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },

    })
        .then((response:any) => {
          dispatch(showAlert({variant:Variants.SUCCESS,heading:"Attachement",text:response.data.message}))

        })
        .catch((error:any) => {
          //dispatch(showAlert({variant:Variants.DANGER,heading:props.title,text:error.response.request.response}))
          console.log(error.response.data)
        });

        handleClose()



  }
  const [formData, setFormData] = useState<any>({});
  const opt:Opt[] = [

    {
      value: false,
      label: 'Non',
    },
    {
      value: true,
      label: 'Oui',
    },

  ];

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
  useEffect(() => {
    getAttachementFields();
  },[]);


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
                          <h5 className="text-center card-title">Flash du Marché</h5>
                          <h5 className="text-center card-title">{`N° : ${mid.marche} du mois ${mid.month}/${mid.year}` }</h5>
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
                                  ,borderRadius:0}} id="dropdown-basic"
                                >
                                  <i className="far fa-trash-alt"></i>
                                  &nbsp;Supprimer
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                      <Dropdown.Item >
                                        <i className="fas fa-eraser"></i>
                                        &nbsp;Suppression</Dropdown.Item>


                                  <Dropdown.Item >
                                    <i className="far fa-trash-alt"></i>
                                    &nbsp;Corbeille</Dropdown.Item>
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
                          <DisplayDataGridModal img={""} title={"Attachement"} cols={cols}   />

                          <div style={containerStyle}>

                            <div style={{ width:"100%", height: '650px', boxSizing: 'border-box' }}>
                              <div style={gridStyle} className="ag-theme-alpine  " >
                                <AgGridReact ref={gridRef}
                                             rowData={rows} columnDefs={cols}
                                             onGridReady={onGridReady}
                                             gridOptions={gridOptions}
                                             onSelectionChanged={onSelectionChanged}
                                             onRowClicked={handleRowClick}


                                />
                                <Modal show={shown} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Attachement</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {attachementFields.map((field,index) => (
                                        <Form.Group className="w-100"  controlId={"validation"+index} key={index}>
                                          <Form.Label>
                                            <strong>
                                              {field.label  +" "}

                                            </strong>
                                          </Form.Label>
                                          {
                                            field.type === "PrimaryKeyRelatedField"?
                                                <>
                                                  <Form.Control
                                                      name={field.name}
                                                      as="input"
                                                      required
                                                      list={field.name}
                                                      className="w-100"
                                                      value={formData[field.name] || ''}
                                                      onChange={(e)=>handleInputChange(e)}
                                                  />
                                                  <datalist id={field.name}>
                                                    {field.queryset.map((qs:any, key:any) => (
                                                        <option  key={key} value={qs.id}>{qs.libelle}</option>
                                                    ))}

                                                  </datalist>

                                                </>


                                                :
                                                field.type === 'BooleanField' ?

                                                    <Form.Control
                                                        as="select"
                                                        name={field.name}
                                                        required
                                                        className="w-100"
                                                        value={formData[field.name] || '' }
                                                        onChange={(e)=>handleSelectChange(e)}>

                                                      {opt.map((item,index) => (
                                                          <option key={index} value={String(item.value)}>{item.label}</option>
                                                      ))}

                                                    </Form.Control>


                                                    : field.type === 'DateField' ?
                                                        <Form.Control
                                                            name={field.name}
                                                            required
                                                            className="w-100"
                                                            type="date"
                                                            value={formData[field.name] || ''}
                                                            onChange={(e)=>handleInputChange(e)}
                                                        />
                                                        : field.type === 'IntegerField' || field.type ==='DecimalField'  ?
                                                            <Form.Control
                                                                name={field.name}
                                                                required
                                                                className="w-100"
                                                                type="number"
                                                                value={formData[field.name] || 0}
                                                                step={0.01}
                                                                onChange={(e)=>handleInputChange(e)}
                                                            />


                                                            :
                                                            <Form.Control
                                                                name={field.name}
                                                                required
                                                                className="w-100"
                                                                type="text"
                                                                value={formData[field.name] || ''}
                                                                onChange={(e)=>handleInputChange(e)}
                                                            />



                                          }

                                        </Form.Group>
                                    ))}

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }}
                                           onClick={envoyer} >
                                      <i className="fa fa-send" style={{marginRight:5 }} ></i>
                                      Envoyer
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
      </>
  );


};

export default ListFlash;
