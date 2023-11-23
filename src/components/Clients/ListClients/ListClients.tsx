import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";

const ListClients: React.FC<any> = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
    const [paginationPageSize, setPaginationPageSize] = useState(20); // Initial page size
    const [clients, setClients] = useState<any[]>([]);
    const gridRef = useRef(null);
    const navigate=useNavigate();
    const getClients = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getclients/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {

                setClients(response.data);



            })
            .catch((error:any) => {

            }).finally(() => {

            });
    }

    useEffect(() => {
        getClients()
    },[])

    const columnDefs:any = [


          { headerName: 'code', field: 'code_client',  cellStyle: { textAlign: 'start'  },resizable: true },
          { headerName: 'libelle', field: 'libelle_client',  cellStyle: { textAlign: 'start' },resizable: true },
          { headerName: 'nif', field: 'nif',  cellStyle: { textAlign: 'start' },resizable: true },
          { headerName: 'raison social', field: 'raison_social',  cellStyle: { textAlign: 'start' },resizable: true },
        { headerName: 'num registe commerce', field: 'num_registre_commerce',  cellStyle: { textAlign: 'start' },resizable: true },
        { headerName: 'est_client_cosider', field: 'est_client_cosider',  cellStyle: { textAlign: 'start' },resizable: true },

  ];



    const onPageSizeChanged = (newPageSize:any) => {
        setPaginationPageSize(newPageSize);
    };


    const gridOptions:any = {
        pagination: true,
        domLayout: 'autoHeight', // or 'autoHeight' for auto-sizing
        paginationPageSize: paginationPageSize,
        onPageSizeChanged: onPageSizeChanged,
        defaultColDef: {
            flex: 1,
            minWidth: 300,
        },
        rowSelection: 'multiple',



    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SearchClient: React.FC<any> = () => {

        return(
    <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header >
                    <Modal.Title>
                        <h2 className="modal-title">
                            <i className="fas fa-search" style={{ fontSize: 40 }} />
                            &nbsp;Recherche
                        </h2>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row" style={{ marginBottom: 10 }}>
                            <div className="col-md-6" style={{ marginTop: 5 }}>
                                <Form.Select className="form-control" >
                                    <option value="__exact">égale</option>
                                    <option value="__icontains">contient</option>
                                    <option value="">commence par</option>
                                    <option value="3">termine par</option>
                                    <option value="__lte">inferieur ou égale</option>
                                    <option value="__gte">superieur ou égale</option>
                                    <option value="">entre</option>

                                </Form.Select>
                            </div>
                            <div className="col-md-6" style={{ marginTop: 5 }}>
                                <input className="form-control" type="text" placeholder="Code Client" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" type="button" onClick={handleClose} >
                        Annuler
                    </button>
                    <button className="btn btn-primary" type="button"
                            style={{ background: "#df162c", borderWidth: 0 }}>
                        Rechercher
                    </button>
                </Modal.Footer>
            </Modal>


    </>
        );


    }



    return (
        <>

            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="card shadow">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 text-nowrap">
                                            <div
                                                id="dataTable_length"
                                                className="dataTables_length"
                                                aria-controls="dataTable"
                                            />
                                            <Form.Select className="form-control-user" style={{ height: 35 ,width:120 }} aria-label="Default select example" onChange={(e) => onPageSizeChanged(Number(e.target.value))} value={paginationPageSize}>
                                                <option value="20">20</option>
                                                <option value="40">40</option>
                                                <option value="60">60</option>
                                                <option value="80">80</option>
                                                <option value="100">100</option>
                                            </Form.Select>

                                        </div>
                                        <div className="col-md-6">
                                            <div id="dataTable_filter" className="text-md-end dataTables_filter">

                                                <ButtonGroup style={{ height: 35}}>
                                                    <Button className="btn btn-primary btn-sm" type="button" onClick={handleShow}
                                                            style={{ height: 35 , background: "#df162c", borderWidth: 0  }}>
                                                    <i className="fas fa-search" />
                                                    &nbsp;Recherche
                                                    </Button>
                                                    <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                                    onClick={() => navigate('/ajout_c')}>
                                                        <i className="fas fa-plus" />
                                                        &nbsp;Ajouter
                                                    </Button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 35 , background: "#df162c", borderWidth: 0
                                                        ,borderTopLeftRadius:0,borderBottomLeftRadius:0}} id="dropdown-basic">
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
                                        className="table-responsive table mt-2"
                                        role="grid"
                                        aria-describedby="dataTable_info"
                                    >
                                        <div style={containerStyle}>
                                            <div style={{ width:"100%", height: '600px', boxSizing: 'border-box' }}>

                                                <div style={gridStyle} className="ag-theme-alpine  ">
                                                    <AgGridReact ref={gridRef}
                                                                 rowData={clients} columnDefs={columnDefs}
                                                                 pagination={gridOptions.pagination}
                                                                 domLayout={gridOptions.domLayout}
                                                                 paginationPageSize={gridOptions.paginationPageSize}
                                                                 suppressRowClickSelection={true}
                                                                 rowSelection={'multiple'}
                                                                 overlayNoRowsTemplate={'<div class="spinner-border text-primary" role="status">\n' +
                                                                     '  <span class="visually-hidden">Loading...</span>\n' +
                                                                     '</div>'}


                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SearchClient/>
        </>


  );
};

export default ListClients;
