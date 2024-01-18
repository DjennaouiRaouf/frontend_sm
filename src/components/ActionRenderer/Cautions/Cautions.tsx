import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showModal3 as displayCautionsModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import AddCautions from "../../Marche/Cautions/AddCautions/AddCautions";
//import AddCautions from "../../Marche/Cautionss/AddCautions/AddCautions";


type AddCautionsProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const Cautions: React.FC<AddCautionsProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();


  const handleAddCautions = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      dispatch(displayCautionsModal(rowData[props.pk]));
    }
  }

  const handleListCautions = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/liste_cautions', { state: { marche: rowData[props.pk] } })
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
                  title="Ajouter une Cautions"
                  onClick={handleAddCautions}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Liste des Cautionss"
                  onClick={handleListCautions}
              >
                <i className="fas fa-list"></i>
              </button>
              <AddCautions />
            </>
          </>



        </div>

      </>



  );
};

export default Cautions;



