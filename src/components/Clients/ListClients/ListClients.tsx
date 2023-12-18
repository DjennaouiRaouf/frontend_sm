import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";
import DataGrid from "../../DataGrid";
import customer from '../../icons/customer.png'
import {ModalProvider, useModal} from "../../Context/FilterModalContext/FilterModalContext";
import FilterModal from "../../DataGrid/FilterModal/FilterModal";

const ListClients: React.FC<any> = () => {
    const navigate=useNavigate();

    const {url,openModal } = useModal();

    const Filterone = () => {

    }
    const Filtertwo = () => {
    }
    const filter = () => {
        openModal()
    }





    return (
        <>

            <FilterModal img={customer} title={"Rechercher un client"} endpoint_fields={"/forms/clientfilterfields/"} />
            <div id="wrapper" >
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" >
                        <div className="container-fluid" >
                            <div className="card shadow" >
                                <div className="card-body" >
                                    <h3 className="text-dark mb-0">{"Liste des clients"}</h3>
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
                                                    <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                                            onClick={()=>filter()}>
                                                        <i className="fas fa-plus" />
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
                                                            <Dropdown.Item onClick={()=>Filterone()}>
                                                                <i className="bi bi-file-earmark-pdf-fill"></i>
                                                                &nbsp;pdf</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=>Filtertwo()}>
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
                                        <DataGrid img={customer} title={"Client"} endpoint_cols={"/forms/clientfields/?flag=l"} endpoint_rows={`/sm/getclients/`}
                                        />
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
