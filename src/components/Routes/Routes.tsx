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
import ListeODS from "../Marche/ODS/ListeODS/ListeODS";
import AddODS from "../Marche/ODS/AddODS/AddODS";
import ListFlash from "../Marche/Flash/ListFlash/ListFlash";
import ListAttachements from "../Marche/ListAttachements/ListAttachements";
import ErrorRoute from "../ErrorRoute/ErrorRoute";
import AttachementPDFViewPrinter from "../AttachementPDFViewPrinter/AttachementPDFViewPrinter";
import EtatCTRLInvoicePDFViewPrinter from "../EtatCTRLInvoicePDFViewPrinter/EtatCTRLInvoicePDFViewPrinter";
import DetailInvoicePDFViewPrinter from "../DetailInvoicePDFViewPrinter/DetailInvoicePDFViewPrinter";
import AddDQE from "../Marche/AddDQE/AddDQE";
import DelFacture from "../Marche/Facture/DelFacture/DelFacture";






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
              path="marche/liste_m/liste_dqe"
              element={
                  authenticated && permission.includes("api_sm.view_dqe") ? (
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
              path="marche/liste_m/add_dqe"
              element={
                  authenticated && permission.includes("api_sm.add_dqe") ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <AddDQE/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/marche/liste_m/liste_facture/creances"
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
              path="/marche/liste_m/liste_dqe/del_dqe"
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
              path="/marche/liste_m/liste_facture/del_fact"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <DelFacture/>
                          </ModalProvider>




                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="marche/liste_m/liste_facture"
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
              path="marche/liste_m/liste_facture/liste_dfacture"
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
              path="marche/liste_m/liste_avance"
              element={
                  authenticated  && permission.includes("api_sm.view_avance")? (
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
              path="marche/liste_m/liste_cautions"
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
              path="/marche/liste_m/liste_facture/print_facture"
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
              path="/marche/liste_m/liste_facture/print_rg_facture"
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
              path="/clients/ajout_c"
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
              path="marche/liste_m/ajout_cautions"
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
              path="marche/liste_m/liste_ods"
              element={
                  authenticated   ? (
                      <>
                          <NavigationBar/>
                          <ModalProvider>
                              <ListeODS />
                          </ModalProvider>



                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />


          <Route
              path="/clients/liste_c"
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
              path="/sites/liste_s"
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
              path="/nt/liste_nt"
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
              path="/marche/liste_m"
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
              path="/nt/ajout_nt"
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
              path="marche/liste_m/liste_caution"
              element={
                  authenticated  ? (
                      <>
                          <NavigationBar/>
                          <ListCautions />


                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="marche/liste_m/liste_att"
              element={
                  authenticated  ? (
                      <>
                          <NavigationBar/>
                          <ListAttachements />


                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="marche/liste_m/liste_flash"
              element={
                  authenticated  ? (
                      <>
                          <NavigationBar/>
                          <ListFlash />


                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />

          <Route
              path="/sites/ajout_s"
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
              path="/marche/ajout_m"
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

          <Route
              path="/print_att"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <AttachementPDFViewPrinter/>
                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/marche/liste_m/liste_facture/print_ecf"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <EtatCTRLInvoicePDFViewPrinter/>
                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/marche/liste_m/liste_facture/liste_dfacture/print_detail"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <DetailInvoicePDFViewPrinter/>
                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />


          <Route
              path="*"
              element={

                      <>
                          <ErrorRoute />
                      </>

              }
          />




      </Router>

  )
};

export default Routes;
