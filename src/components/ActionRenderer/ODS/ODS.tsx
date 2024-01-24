import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";
import {showAlert, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";
import AlertMessage from "../../AlertMessage/AlertMessage";


type ODSProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const ODS: React.FC<ODSProps> = (props) => {
  const navigate=useNavigate();
 

  const handlelistODS = () => {
    if(permission.includes("api_sm.view_ordre_de_service")){
      const rowData:any =  props.data  ;
      if (props.pk){
        navigate('liste_ods', { state: { marche: rowData[props.pk] } })
      }

    }

  };
 


  const { permission } = useContext(PermissionContext);

  return (
      <>
        <div className="btn-group btn-group-sm" role="group">
          <>
            <>
              
              { permission.includes("api_sm.add_ordre_de_service") &&
                  <button
                      className="btn btn-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      type="button"
                      style={{ background: "#df162c", borderWidth: 0 }}
                      title="Ajout un ODS"

                  >
                    <i className="fas fa-download" />
                  </button>
              }
              { permission.includes("api_sm.view_ordre_de_service") &&
                  <button
                      className="btn btn-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      type="button"
                      style={{ background: "#df162c", borderWidth: 0 }}
                      title="Liste ODS"
                      onClick={handlelistODS}
                  >
                    <i className="fas fa-list-ul" />
                  </button>
              }
            </>
          </>
        </div>


      </>



  );
};

export default ODS;
