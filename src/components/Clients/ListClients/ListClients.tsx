import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";
import axios from "axios";
import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";
import DataGrid from "../../DataGrid";

const ListClients: React.FC<any> = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [cols, setCols] = useState<any[]>([]);

    const navigate=useNavigate();

    const getClientsRows = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getclients/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {
                setRows(response.data);
            })
            .catch((error:any) => {

            }).finally(() => {

            });
    }

    const getClientsCols = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/clientfields/?flag=l`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {
                setCols(response.data.fields);
            })
            .catch((error:any) => {

            }).finally(() => {

            });
    }

    useEffect(() => {
        getClientsCols();
    },[])

    useEffect(() => {
        getClientsRows();
    },[])

    const onFilterButtonClick = () => {
        console.log(cols)

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
                                            <Form.Select className="form-control-user" style={{ height: 35 ,width:120 }} aria-label="Default select example" >
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

                                                    <Button className="btn btn-primary btn-sm" type="button" style={{ height: 35 , background: "#df162c", borderWidth: 0  }}
                                                    onClick={() => navigate('/ajout_c')}>
                                                        <i className="fas fa-plus" />
                                                        &nbsp;Ajouter
                                                    </Button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  className="btn btn-primary btn-sm"  style={{ height: 35 , background: "#df162c", borderWidth: 0
                                                        ,borderTopLeftRadius:0,borderBottomLeftRadius:0}} id="dropdown-basic"
                                                            onClick={onFilterButtonClick}>
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
                                        <DataGrid columns={cols} rows={rows}/>
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
