import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";


type DetailFactureProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const DetailFacture: React.FC<DetailFactureProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handlelistDetailFacture = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/liste_dfacture', { state: { facture: rowData[props.pk] } })
    }

  };









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
                  title="Liste DetailFacture"
                  onClick={handlelistDetailFacture}
              >
                <i className="fas fa-list-ul" />
              </button>

            </>
          </>
        </div>


      </>



  );
};

export default DetailFacture;
