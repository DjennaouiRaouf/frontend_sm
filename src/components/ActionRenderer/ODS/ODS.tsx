import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";
import {showModal3 as showODSModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import AddAvance from "../../Marche/Avances/AddAvance/AddAvance";
import AddODS from "../../Marche/ODS/AddODS/AddODS";

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
  const dispatch = useDispatch();

  const handlelistODS = () => {
    if(permission.includes("api_sm.view_ordre_de_service")){
      const rowData:any =  props.data  ;
      if (props.pk){
        const val:string=rowData[props.pk]
        navigate(`liste_ods/${encodeURIComponent(val)}`)
      }


    }

  };

  const handleAddODS = () => {
    if(permission.includes("api_sm.add_ordre_de_service")){
      const rowData:any =  props.data  ;
      if (props.pk){
        dispatch(showODSModal(rowData[props.pk]));
      }
    }
  }
 


  const { permission } = useContext(PermissionContext);

  return (
      <>
        <div className="btn-group btn-group-sm" role="group">
          <>
            <>
              
              { permission.includes("api_sm.add_ordre_de_service") &&

                  <>
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        type="button"
                        style={{ background: "#df162c", borderWidth: 0 }}
                        title="Ajout un ODS"
                        onClick={handleAddODS}
                    >
                      <i className="fas fa-plus" />
                    </button>
                    <AddODS />
                  </>

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
