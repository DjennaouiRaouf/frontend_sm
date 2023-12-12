import React, {useContext} from 'react'
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../LoginForm/LoginForm";
import AddClientForm from "../Clients/AddClientForm/AddClientForm";
import Home from "../Home/Home";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import AddMarcheForm from "../Marche/AddMarcheForm/AddMarcheForm";
import AddSiteForm from "../Site/AddSiteForm/AddSiteForm";
import NavigationBar from "../NavigationBar/NavigationBar";
import PageFooter from "../PageFooter/PageFooter";
import ListClients from "../Clients/ListClients/ListClients";

import ListMarche from "../Marche/ListMarche/ListMarche";
import ListSites from "../Site/ListeSites/ListeSites";
import ListeNT from "../NT/ListeNT/ListeNT";





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
              path="/home"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Home/>
                          <PageFooter/>


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
                           <PageFooter/>

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
                          <ListClients />
                          <PageFooter/>

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
                          <ListSites/>
                          <PageFooter/>

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
                          <ListeNT/>
                          <PageFooter/>

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
                          <PageFooter/>

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

                          <PageFooter/>
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

                          <PageFooter/>
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

                          <PageFooter/>

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
