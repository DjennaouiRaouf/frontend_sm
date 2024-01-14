import * as React from "react";
import {useDispatch} from "react-redux";

import {showModal as displayfactureModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";

import Encaissement from "../../Marche/Encaissement/Encaissement";
import {useNavigate} from "react-router-dom";

type PaiementFactureProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const PaiementFacture: React.FC<PaiementFactureProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();



  const handlePaymentInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      dispatch(displayfactureModal(rowData[props.pk]));
    }
  }
  const handlePaidInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/creances', { state: { facture: rowData[props.pk] } })
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
                    title="Encaissement"
                    onClick={handlePaymentInvoice}
                >
                  <i className="bi bi-cash-coin"></i>
                </button>
                <Encaissement/>
                <button
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    type="button"
                    style={{ background: "#df162c", borderWidth: 0 }}
                    title="Suivi des encaissement et créances"
                    onClick={handlePaidInvoice}
                >
                  <i className="far fa-calendar"></i>
                </button>
              </>
        </div>

      </>



  );
};

export default PaiementFacture;
