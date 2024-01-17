import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showModal2 as displayavanceModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import AddAvance from "../../Marche/Avances/AddAvance/AddAvance";


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
    const rowData:any =  props.data  ;
    if (props.pk){
      dispatch(displayavanceModal(rowData[props.pk]));
    }
  }

  const handleListAvance = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/liste_avance', { state: { marche: rowData[props.pk] } })
    }
  }





  return (
      <>

        <div className="btn-group btn-group-sm" role="group">
          <>
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
              <AddAvance />
            </>
          </>



        </div>

      </>



  );
};

export default Avance;
