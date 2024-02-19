import * as React from "react";
import {Button, ButtonGroup, Dropdown, Form, Modal} from "react-bootstrap";

import {useLocation, useNavigate} from "react-router-dom";
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
import ImprimerFacture from "../../../ActionRenderer/ImprimerFacture/ImprimerFacture";
import DisplayRow from "../../../ActionRenderer/DisplayRow/DisplayRow";
import PaiementFacture from "../../../ActionRenderer/PaiementFacture/PaiementFacture";
import DetailFacture from "../../../ActionRenderer/DetailFacture/DetailFacture";
import AlertMessage from "../../../AlertMessage/AlertMessage";
import {useDispatch} from "react-redux";
import {showAlert, Variants} from "../../../../Redux-Toolkit/Slices/AlertSlice";
import numeral from "numeral";
import Avance from "../../../ActionRenderer/Avance/Avance";
import test from "node:test";
import avance from "../../../ActionRenderer/Avance/Avance";


type ListFactureProps = {
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
        case 'montant_cumule' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        case 'montant_precedent' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        case 'montant_mois' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        case 'montant_rg' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
           
        case 'montant_taxe' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
           
        case 'montant_rb' :
                return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
               
                
        case "montant_factureHT":
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            
        case "montant_factureTTC":
                return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
               

        case 'montant_ava_remb' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

        case 'montant_avf_remb' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>


        default:
            return <span>{value}</span>
    }

};

const ListFacture: React.FC<any> = () => {
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
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location = useLocation();
    const mid = location.state;

    const getCols = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/facturefields/?flag=l`,{
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
                        headerName:'Afficher',
                        cellRenderer:DisplayRow,
                        cellRendererParams:{
                            modelName:response.data.models,
                            pk:response.data.pk
                        }

                },
                    {
                        headerName: 'Imprimer',
                        cellRenderer: ImprimerFacture,
                        cellRendererParams: {
                            modelName: response.data.models,
                            pk: response.data.pk
                        }
                    },
                    {
                        headerName: 'Paiement & Créances',
                        cellRenderer: PaiementFacture,
                        cellRendererParams: {
                            modelName: response.data.models,
                            pk: response.data.pk
                        }
                    },
                    {
                        headerName: 'Detail de la facture',
                        cellRenderer: DetailFacture,
                        cellRendererParams: {
                            modelName: response.data.models,
                            pk: response.data.pk
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


    const getRows = async(url:string) => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacture/?marche=${mid.marche}&${url}`,{
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
            XLSX.writeFile(wb, `factures_${yearString}-${monthString}-${dayString}.xlsx`);
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

        selectedRows.forEach(obj => {
            pks.push(obj[pk])
        });
        const pkList:any={}
        pkList[pk]=pks
        console.log(pkList)
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/sm/annulefacture/`,{
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

    const getRowStyle = (params: any):any => {
        if (params.data.montant_avf_remb === "0.00" && params.data.montant_ava_remb === "0.00") {
            return { background: '#f2dede' };
        }
        return {background:"#dff0d8"};

    }

    useEffect(() => {
        getCols();
    },[]);




    useEffect(() => {
        getRows("");
    },[]);
    // get rows and cold dqe
    /* <DataGrid img={agreement} title={"DQE"} endpoint_cols={"/forms/dqefields/?flag=l"} endpoint_rows={"/sm/getmdqe/"+mid.pkValue+"/"} />*/

    const rgFacture = async() => {

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacturerg/?marche=${mid.marche}`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                console.log(response.data)
                if(response.data.extra.total_rg ){
                    navigate('print_rg_facture', { state: { marche: mid.marche} })

                }
                else{
                    dispatch(showAlert({variant:Variants.DANGER,heading:"Facture RG",text:"Ce Marché ne posséde pas de retenue de garantie"}))
                }

            })
            .catch((error:any) => {
            });
    }
    
    const etat_ctrl_facture = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ecf/?marche=${mid.marche}`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                console.log(response.data)

                    navigate('print_ecf', { state: { marche: mid.marche} })




            })
            .catch((error:any) => {
            });

    }
    const displayDeleted = async() => {

        navigate('del_fact', { state: { marche: mid.marche } })
    }

    const [shown, setShown] = useState(false);
    const [avances,setAvances]=useState([]);
    const handleClose = () => {
        setShown(false);
        setCheckedItems([])
        setItems([])
    }
    const handleShow = () => {
        getAvances();
        setShown(true);
    }
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [items, setItems] = useState<any[]>([]);


    const handleCheckboxChange = (item: any) => {
        const isChecked = checkedItems.includes(item['id']);
        if (isChecked) {
            // Remove item if already checked
            setCheckedItems(checkedItems.filter(id => id !== item['id']));
            setItems(items.filter(item => item.id !== item['id']));
        } else {
            // Append item to the list if checked
            setCheckedItems([...checkedItems, item['id']]);
            setItems([...items, item['id']]);
        }
    };

    const getAvances = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getavance/?marche=${mid.marche}&remboursee=False`,{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                setAvances(response.data);



            })
            .catch((error:any) => {

            });
    }

    useEffect(() => {
        getAvances();
    },[]);

    const Remb = async() => {
        const pks:any[]=[]
        selectedRows.forEach(obj => {
            if(obj['montant_ava_remb'] || obj['montant_avf_remb'] ){
                console.log(obj)
                pks.push(obj[pk])
            }

        });
        const pkList:any={}
        pkList[pk]=pks
        const data:any={
            pkList,
            avances:items
        }
        console.log(data)



        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/remb/`, [pkList,items],{
            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
                'Content-Type': 'application/json',

            },

        })
            .then((response:any) => {
                getRows("");
                dispatch(showAlert({variant:Variants.SUCCESS,heading:"Remboursement",text:response.data.message}))


            })
            .catch((error:any) => {
                dispatch(showAlert({variant:Variants.DANGER,heading:"Remboursement",text:error.response.data.message}))


            });
        setSelectedRows([])
    }

    return (
        <>
            <>
                <FilterModal img={bill} title={"Rechercher une Facture"} endpoint_fields={"/forms/facturefilterfields/"} filter={getRows}  />
                <AlertMessage/>
                <Modal show={shown} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Selectionner l'avance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {avances.map(item => (
                            <Form.Check
                                key={item['id']}
                                type="checkbox"
                                id={`checkbox-${item['id']}`}
                                label={`${item['type']} ${item['num_avance']}`}
                                checked={checkedItems.includes(item['id'])}
                                onChange={() => handleCheckboxChange(item)}
                            />
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }}
                                onClick={Remb}>
                            <i className="fa fa-send" style={{marginRight:5 }} ></i>
                            Rebmourser
                        </Button>


                    </Modal.Footer>
                </Modal>

                <div id="wrapper" >
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content" >
                            <div className="container-fluid" >
                                <div className="card shadow" >
                                    <div className="card-body" >

                                        <div className="card" style={{ height:'90px',width: "40%",background:'#ebebeb' }}>
                                            <div className="card-body text-center">
                                                <h5 className="text-center card-title">Factures du marche</h5>
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
                                                        <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                                                onClick={handleShow}>
                                                            <i className="fas fa-reply"></i>
                                                            &nbsp;Remboursement
                                                        </Button>


                                                        <Dropdown>
                                                            <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 35 , background: "#df162c", borderWidth: 0
                                                                ,borderRadius:0}} id="dropdown-basic"
                                                            >
                                                                <i className="far fa-trash-alt"></i>
                                                                &nbsp;Annulation
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={delSelected}>
                                                                    <i className="fas fa-eraser"></i>
                                                                    &nbsp;Annuler</Dropdown.Item>
                                                                <Dropdown.Item onClick={displayDeleted}>
                                                                    <i className="far fa-trash-alt" ></i>
                                                                    &nbsp;Factures Annulées</Dropdown.Item>
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
                                                                {/*<Dropdown.Item onClick={etat_ctrl_facture}>
                                                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                                                    &nbsp;Etat de controle des factures</Dropdown.Item>*/}
                                                                <Dropdown.Item onClick={rgFacture}>
                                                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                                                    &nbsp;Facture Retenue de garantie</Dropdown.Item>
                                                                <Dropdown.Item onClick={export_xlsx}>
                                                                    <i className="bi bi-filetype-xlsx"></i>
                                                                    &nbsp;Exporter les factures</Dropdown.Item>
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
                                                <DisplayDataGridModal img={bill} title={"Facture"} cols={cols}   />

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

export default ListFacture;
