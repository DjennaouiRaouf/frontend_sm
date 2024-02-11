import * as React from "react";
import { Button, ButtonGroup, Dropdown} from "react-bootstrap";

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
            break;
        case 'montant_precedent' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            break;
        case 'montant_mois' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            break;
        case 'montant_rg' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            break;

        case 'montant_taxe' :
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            break;

            case 'montant_rb' :
                return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
                break;

        case "montant_factureHT":
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
            break;

            case'montant_factureTTC':
                return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
                break;



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
        const myDictionary: { [key: string]: any } = {};
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
                    navigate('/print_rg_facture', { state: { marche: mid.marche} })
                    //navigate('/print_rg_facture', { state: { marche: , extra:response.data.extra} })
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
                if(response.data.extra.total_rg ){
                    navigate('//print_ecf', { state: { marche: mid.marche} })
                    //navigate('/print_rg_facture', { state: { marche: , extra:response.data.extra} })
                }
                else{
                    dispatch(showAlert({variant:Variants.DANGER,heading:"Facture RG",text:"Ce Marché ne posséde pas de retenue de garantie"}))
                }

            })
            .catch((error:any) => {
            });

    }
    const displayDeleted = async() => {

        navigate('/del_fact', { state: { marche: mid.marche } })
    }
    return (
        <>
            <>
                <FilterModal img={bill} title={"Rechercher une Facture"} endpoint_fields={"/forms/facturefilterfields/"} filter={getRows}  />
                <AlertMessage/>
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
                                                                <Dropdown.Item onClick={etat_ctrl_facture}>
                                                                    <i className="bi bi-file-earmark-pdf-fill"></i>
                                                                    &nbsp;Etat de controle des factures</Dropdown.Item>
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
