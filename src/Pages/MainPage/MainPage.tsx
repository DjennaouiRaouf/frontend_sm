import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "../../components/Routes/Routes";
import {AuthProvider} from "../../components/Context/AuthContext/AuthContext";
import {PermissionProvider} from "../../components/Context/PermissionContext/PermissionContext";



const MainPage: React.FC<any> = () => {

  return (
      <AuthProvider>
          <PermissionProvider>
              <BrowserRouter>
                        <Routes />
              </BrowserRouter>
          </PermissionProvider>
      </AuthProvider>

  )
};

export default MainPage;
