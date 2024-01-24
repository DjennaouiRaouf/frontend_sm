import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showModal as displayfactureModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import AddFacture from "../../Marche/Facture/AddFacture/AddFacture";


type FacturationProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const Facturation: React.FC<FacturationProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();


  const handleAddInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      dispatch(displayfactureModal(rowData[props.pk]));
    }
  }

  const handleListInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('liste_facture', { state: { marche: rowData[props.pk] } })
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
                      title="Ajouter une facture"
                      onClick={handleAddInvoice}
                  >
                    <i className="fas fa-file-invoice"></i>
                  </button>
                  <button
                      className="btn btn-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      type="button"
                      style={{ background: "#df162c", borderWidth: 0 }}
                      title="Liste des factures"
                      onClick={handleListInvoice}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                  <AddFacture />
                </>
              </>



        </div>

      </>



  );
};

export default Facturation;
