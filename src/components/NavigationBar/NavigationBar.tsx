import * as React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from "react-avatar";
import logo from "../icons/logo.png"
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import {useNavigate} from "react-router-dom";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";





const NavigationBar: React.FC<any> = () => {
    const[username,setUsername]=useState("");
    const { authenticated,setAuthenticated } = useContext(AuthContext);
    const navigate=useNavigate();
    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/logout/`,{
            withCredentials:true,
            headers:{
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response: any) => {
                setAuthenticated(null);


            })
            .catch((error: any) => {
            });

    };

    const whoami= async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/whoami/`,{
            headers:{
                Authorization: `Token ${Cookies.get("token")}`
            }

        })
            .then((response: any) => {
                setUsername(response.data.whoami);
            })
            .catch((error: any) => {

            });

    };


    useEffect(() => {
        whoami();
    });

    const link = (url:string) => {
        navigate(url);
    }



    const { permission } = useContext(PermissionContext);

    return (
        <Navbar expand="lg" className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
            <Container >
                <Navbar.Brand>
              <span>
                <img width={90} height={39} src={logo} />
              </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home"></Nav.Link>

                        <NavDropdown title="Clients" id="basic-nav-dropdown">
                            {
                                permission.includes("api_sm.add_clients") &&
                                <NavDropdown.Item href="/ajout_c">Ajouter un client</NavDropdown.Item>

                            }
                            {
                                permission.includes("api_sm.view_clients") &&
                                <NavDropdown.Item href="/liste_c">Lister les clients</NavDropdown.Item>

                            }
                        </NavDropdown>


                        <NavDropdown title="Sites" id="basic-nav-dropdown">
                            {
                                permission.includes("api_sm.add_sites") &&
                                <NavDropdown.Item href="/ajout_s">Ajouter un site</NavDropdown.Item>
                            }
                            {
                                permission.includes("api_sm.view_sites") &&
                                <NavDropdown.Item href="/liste_s">Lister les sites</NavDropdown.Item>
                            }
                        </NavDropdown>


                            <NavDropdown title="Marchés" id="basic-nav-dropdown">
                                {
                                    permission.includes("api_sm.add_marche") &&
                                    <NavDropdown.Item href="/ajout_m">Ajouter un Marché</NavDropdown.Item>
                                }
                                {
                                    permission.includes("api_sm.view_marche") &&
                                    <NavDropdown.Item href="/liste_m">Lister les Marchés</NavDropdown.Item>
                                }

                            </NavDropdown>



                        <NavDropdown title="NT" id="basic-nav-dropdown">
                            {
                                permission.includes("api_sm.add_nt") &&
                                <NavDropdown.Item href="/ajout_nt">Ajouter un numero de travail</NavDropdown.Item>
                            }
                            {
                                permission.includes("api_sm.view_nt") &&
                                <NavDropdown.Item href="/liste_nt">Lister les numeros des traveaux </NavDropdown.Item>
                            }

                        </NavDropdown>


                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow">
                                <a
                                    className="dropdown-toggle nav-link"
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                >
                    <span className="d-none d-lg-inline me-2 text-gray-600 small">
                       {username}
                    </span>

                                    <Avatar name={username} size="32" round={true} src={""}

                                    />
                                </a>
                                <div  className="dropdown-menu shadow dropdown-menu-end animated--grow-in"
                                      data-bs-popper="none">
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Profile
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Settings
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Activity log
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" onClick={logout}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Logout
                                    </a>
                                </div>
                            </div>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
