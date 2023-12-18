import React from 'react';

import {Button, ButtonGroup, Dropdown, Modal} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useNavigate} from "react-router-dom";
import DataGrid from "../../DataGrid";
import agreement from '../../icons/agreement.png'
const ListMarche: React.FC<any> = () => {
  const navigate=useNavigate();







  return (
      <>

        <div id="wrapper" >
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" >
              <div className="container-fluid" >
                <div className="card shadow" >
                  <div className="card-body" >
                    <h3 className="text-dark mb-0">{"Liste des marchés"}</h3>
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
                                    onClick={() => navigate('/ajout_m')}>
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
                        className="table-responsive table mt-5 mb-3"
                        role="grid"
                        aria-describedby="dataTable_info"


                    >
                      <DataGrid img={agreement} title={"Marché"} endpoint_cols={"/forms/marchefields/?flag=l"} endpoint_rows={"/sm/getmarche/"} />
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

export default ListMarche;
