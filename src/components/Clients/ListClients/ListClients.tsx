import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";
import DataGrid from "../../DataGrid";


const ListClients: React.FC<any> = () => {
    const navigate=useNavigate();







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


                                        </div>
                                        <div className="col-md-6">
                                            <div id="dataTable_filter" className="text-md-end dataTables_filter">

                                                <ButtonGroup style={{ height: 35}}>

                                                    <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                                    onClick={() => navigate('/ajout_c')}>
                                                        <i className="fas fa-plus" />
                                                        &nbsp;Ajouter
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
                                        <DataGrid endpoint_cols={"/forms/clientfields/?flag=l"} endpoint_rows={"/sm/getclients/"} />
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

export default ListClients;
