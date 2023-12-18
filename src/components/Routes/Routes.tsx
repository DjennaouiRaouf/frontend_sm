import React, {useContext} from 'react'
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





const Routes: React.FC<any> = () => {
    const { authenticated } = useContext(AuthContext);
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
                          <ListDQE/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_c"
              element={
                   authenticated ? (
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
              path="/liste_c"
              element={
                  authenticated ? (
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
                  authenticated? (
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
                  authenticated ? (
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
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <ListMarche/>
                          

                      </>
                  ): (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/ajout_nt"
              element={
                  authenticated ? (
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
                  authenticated ? (
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
                  authenticated ? (
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
                  authenticated ? (
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
