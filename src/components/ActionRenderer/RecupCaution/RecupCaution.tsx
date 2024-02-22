import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {showModal as displayModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import axios from "axios";
import Cookies from "js-cookie";
import {showAlert, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";

type RecupCautionProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;
};

const RecupCaution: React.FC<RecupCautionProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRecup = async() => {
    const rowData:any =  props.data  ;
    if(props.pk){
      rowData["est_recupere"]=true
        console.log(rowData)

      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/sm/recupcaution/`,rowData,{
        headers: {

          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },
      })
          .then((response:any) => {

            props.updateRows('');
            dispatch(showAlert({variant:Variants.SUCCESS,heading:"Caution",text:'Vous avez recuperez votre caution'}))

          })
          .catch((error:any) => {
            console.log(error)

          });


    }


  };


  return (
      <>

        <div className="btn-group btn-group-sm" role="group">

          <button
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              type="button"
              style={{ background: "#df162c", borderWidth: 0 }}
              title="Recuperer ma caution"
              onClick={handleRecup}
          >
            <i className="far fa-hand-rock"></i>
          </button>

        </div>

      </>



  );
};

export default RecupCaution;
