import React, {useContext, useEffect, useState} from 'react'
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../LoginForm/LoginForm";
import AddClientForm from "../Clients/AddClientForm/AddClientForm";
import Home from "../Home/Home";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import AddMarcheForm from "../Marche/AddMarcheForm/AddMarcheForm";
import AddSiteForm from "../Site/AddSiteForm/AddSiteForm";
import NavigationBar from "../NavigationBar/NavigationBar";
import ListClients from "../Clients/ListClients/ListClients";
import ListMarche from "../Marche/ListMarche/ListMarche";
import ListSites from "../Site/ListeSites/ListeSites";
import ListeNT from "../NT/ListeNT/ListeNT";
import AddNT from "../NT/AddNT/AddNT";
import Signup from "../Signup/Signup";
import ListDQE from "../Marche/ListDQE/ListDQE";
import {ModalProvider} from "../Context/FilterModalContext/FilterModalContext";
import ListFacture from "../Marche/Facture/ListFacture/ListFacture";
import InvoicePDFViewPrinter from "../InvoicePDFViewPrinter/InvoicePDFViewPrinter";
import InvoiceRGPDFViewPrinter from "../InvoiceRGPDFViewPrinter/InvoiceRGPDFViewPrinter";
import Creances from "../Marche/Creances/Creances";
import DelDQE from "../Marche/DelDQE/DelDQE";
import ListDetailFacture from "../Marche/Facture/ListDetailFacture/ListDetailFacture";
import ListAvances from "../Marche/Avances/ListAvances/ListAvances";
import ListCautions from "../Marche/Cautions/ListCautions/ListCautions";
import AddCautions from "../Marche/Cautions/AddCautions/AddCautions";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";
import axios from "axios";
import Cookies from "js-cookie";






const Routes: React.FC<any> = () => {

    const { authenticated } = useContext(AuthContext);
    const { permission,setPermission } = useContext(PermissionContext);

  return (
      <Router>
          <Route
              path="/"
              element={
                  ! authenticated ? (
                      <LoginForm />
                  ) : (
                      <Navigate to="/home"  />
                  )
              }
          />
          <Route
              path="/signup"
              element={
                          <Signup/>
              }
          />
          <Route
              path="/home"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Home/>
                          


                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_dqe"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListDQE/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/creances"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <Creances/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/del_dqe"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <DelDQE/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_facture"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListFacture/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/liste_dfacture"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListDetailFacture/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/liste_avance"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListAvances/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_cautions"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListCautions/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/print_facture"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <InvoicePDFViewPrinter/>
                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/print_rg_facture"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <InvoiceRGPDFViewPrinter/>
                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />


          <Route
              path="/ajout_c"
              element={
                   authenticated && permission.includes("api_sm.add_clients") ? (
                       <>
                           <NavigationBar/>
                           <AddClientForm />
                           

                       </>
                  ): (
                  <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_cautions"
              element={
                  authenticated  ? (
                      <>
                          <NavigationBar/>
                          <AddCautions />


                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />


          <Route
              path="/liste_c"
              element={
                  authenticated &&  permission.includes("api_sm.view_clients")  ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                          <ListClients />
                          </ModalProvider>
                          

                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_s"
              element={
                  authenticated && permission.includes("api_sm.view_sites") ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListSites/>
                          </ModalProvider>

                          

                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_nt"
              element={
                  authenticated && permission.includes("api_sm.view_nt") ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListeNT/>
                          </ModalProvider>

                          

                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_m"
              element={
                  authenticated && permission.includes("api_sm.view_marche") ? (
                                  <>
                                      <NavigationBar/>
                                      <ModalProvider>
                                          <ListMarche/>
                                      </ModalProvider>
                                  </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_nt"
              element={
                  authenticated && permission.includes("api_sm.add_nt") ? (
                      <>
                          <NavigationBar/>
                          <AddNT />

                        
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/ajout_s"
              element={
                  authenticated && permission.includes("api_sm.add_sites")  ? (
                      <>
                          <NavigationBar/>
                          <AddSiteForm />

                         
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/liste_s"
              element={
                  authenticated  ? (
                      <>
                          <NavigationBar/>
                          <ListSites />

                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_m"
              element={
                  authenticated && permission.includes("api_sm.add_marche")  ? (
                      <>
                          <NavigationBar/>
                          <AddMarcheForm />
                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
      </Router>

  )
};

export default Routes;
