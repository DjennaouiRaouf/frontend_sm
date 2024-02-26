import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


type ImprimerFactureProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const ImprimerFacture: React.FC<ImprimerFactureProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();






  const handlePrintInvoice = async() => {
    const rowData:any =  props.data  ;

    if (props.pk){
        const val:string=rowData[props.pk]
        navigate(`print_facture/${encodeURIComponent(val)}`)
    }
  }





  return (
      <>

        <div className="btn-group btn-group-sm" role="group">
              <>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    type="button"
                    style={{ background: "#df162c", borderWidth: 0 }}
                    title="Imprimer la facture"
                    onClick={handlePrintInvoice}
                >
                  <i className="fas fa-print"></i>
                </button>


              </>


        </div>

      </>



  );
};

export default ImprimerFacture;
