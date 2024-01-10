import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {showModal as displayfactureModal} from "../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import * as XLSX from "xlsx";
import {
  fetchFields, fetchStateFields,
  setPk,
  showModal as editModal
} from "../../Redux-Toolkit/Slices/EditDataGridModalSlice";
import EditDataGridModal from "../EditDataGridModal/EditDataGridModal";
import settings from '../icons/settings.png'
import AddFacture from "../Marche/Facture/AddFacture/AddFacture";
import Encaissement from "../Marche/Encaissement/Encaissement";

type ActionRendererProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const ActionRenderer: React.FC<ActionRendererProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDisplayClick = () => {
    const rowData:any =  props.data  ;
    dispatch(displayModal({data:rowData}));

  };


  const handlelistDQE = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/liste_dqe', { state: { marche: rowData[props.pk] } })
    }

  };
  const handleAddMulitpleDQE = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const rowData:any =  props.data  ;
    const file = event.target.files?.[0];
    const formData = new FormData();
    if (props.pk && file) {

      formData.append('file', file);
      formData.append(props.pk,rowData[props.pk]);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_upload}`,formData,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'multipart/form-data',
        },

      })
          .then((response:any) => {

          })
          .catch((error:any) => {

          });
    }
  };

  const handledownloadDQE = async() => {
    const rowData:any =  props.data  ;
    if(props.pk){
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_download}?marche__id=${rowData[props.pk]}`,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',
        },

      })
          .then((response:any) => {
            if(response.data.length > 0){
              const ws = XLSX.utils.json_to_sheet(response.data);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
              XLSX.writeFile(wb, 'dqe.xlsx');
            }



          })
          .catch((error:any) => {

          });

    }


  }
  
  const handleEditDQE = () => {
    const rowData:any =  props.data  ;

    if(props.pk){

      dispatch(setPk({pk:props.pk,pkValue:rowData[props.pk]}))
      dispatch(fetchFields({ endpoint_fields:'/forms/dqefields/?flag=f' }));
      dispatch(fetchStateFields({ pk: props.pk,pkValue:rowData[props.pk],endpoint_state:"/forms/dqefieldsstate/" }));
      dispatch(editModal())

    }





  }
  
  const handleAddInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      dispatch(displayfactureModal(rowData[props.pk]));
    }
  }

  const handleListInvoice = () => {
    const rowData:any =  props.data  ;
    if (props.pk){
      navigate('/liste_facture', { state: { marche: rowData[props.pk] } })
    }
  }
  const handlePrintInvoice = async() => {
    const rowData:any =  props.data  ;

    if (props.pk){

      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getfacture/?numero_facture=${rowData[props.pk]}`,{
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
          'Content-Type': 'application/json',

        },
      })
          .then((response:any) => {
            navigate('/print_facture', { state: { facture: response.data[0] } })
          })
          .catch((error:any) => {
          });
    }
  }
  
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

          <button
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              type="button"
              style={{ background: "#df162c", borderWidth: 0 }}
              title="Visualiser"
              onClick={handleDisplayClick}
          >
            <i className="far fa-eye" />
          </button>
          {
            props.modelName === 'Marche'&&
            <>
            <>
              <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  hidden={true}
                  style={{ display: 'none' }}
                  ref={(input) => (fileInputRef.current = input)}
              />
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Ajouter plusieurs DQE (xlsx)"
                  onClick={handleAddMulitpleDQE}
              >
                <i className="fas fa-upload" />
              </button>
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Telecherger DQE (xlsx)"
                  onClick={handledownloadDQE}
              >
                <i className="fas fa-download" />
              </button>
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Liste DQE"
                  onClick={handlelistDQE}
              >
                <i className="fas fa-list-ul" />
              </button>
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Facturation"
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
          }
          {
              props.modelName === 'Factures'&&
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
              
            
          }
          {
            props.modelName === 'DQE'&&
            <>
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Editer le DQE"
                  onClick={handleEditDQE}
              >
                <i className="fas fa-edit" />
              </button>
            <EditDataGridModal title={"Editer un DQE"}
                               img={settings}
                               getRows={props.updateRows}
                               endpoint_submit={'/sm/updatedqe/'}/>

            </>
          }

        </div>

      </>



  );
};

export default ActionRenderer;
