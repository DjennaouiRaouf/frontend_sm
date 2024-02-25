import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showModal2 as displayavanceModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import AddAvance from "../../Marche/Avances/AddAvance/AddAvance";
import {useContext} from "react";
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";


type AddAvanceProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const Avance: React.FC<AddAvanceProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();


  const handleAddAvance = () => {
    if(permission.includes("api_sm.add_avance")) {
      const rowData: any = props.data;
      if (props.pk) {
        dispatch(displayavanceModal(rowData[props.pk]));
      }
    }
  }

  const handleListAvance = () => {
    if(permission.includes("api_sm.view_avance")) {
      const rowData: any = props.data;
      if (props.pk) {
        const val:string=rowData[props.pk]
        navigate(`liste_avance/${encodeURIComponent(val)}`)
      }
    }
  }


  const { permission } = useContext(PermissionContext)

  return (
      <>

        <div className="btn-group btn-group-sm" role="group">
          <>

            {permission.includes("api_sm.add_avance") &&
                <>
                  <button
                      className="btn btn-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      type="button"
                      style={{ background: "#df162c", borderWidth: 0 }}
                      title="Ajouter une Avance"
                      onClick={handleAddAvance}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <AddAvance />
                </>
            }
              {permission.includes("api_sm.view_avance") &&
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Liste des Avances"
                  onClick={handleListAvance}
              >
                <i className="fas fa-list"></i>
              </button>
              }
            </>
        </div>

      </>



  );
};

export default Avance;
