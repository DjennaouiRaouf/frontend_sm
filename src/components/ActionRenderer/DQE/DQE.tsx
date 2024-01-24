import * as React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import {PermissionContext} from "../../Context/PermissionContext/PermissionContext";
import {showAlert, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";
import AlertMessage from "../../AlertMessage/AlertMessage";


type DQEProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const DQE: React.FC<DQEProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handlelistDQE = () => {
    if(permission.includes("api_sm.download_dqe")){
      const rowData:any =  props.data  ;
      if (props.pk){
        navigate('liste_dqe', { state: { marche: rowData[props.pk] } })
      }

    }

  };
  const handleAddMulitpleDQE = () => {
    if(permission.includes("api_sm.upload_dqe")) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if(permission.includes("api_sm.upload_dqe")) {
      const rowData: any = props.data;
      const file = event.target.files?.[0];
      const formData = new FormData();
      if (props.pk && file) {

        formData.append('file', file);
        formData.append(props.pk, rowData[props.pk]);
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_upload}`, formData, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            'Content-Type': 'multipart/form-data',
          },

        })
            .then((response: any) => {
              dispatch(showAlert({variant:Variants.SUCCESS,heading:'DQE',text:response.data.message}))
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }

            })
            .catch((error: any) => {
              dispatch(showAlert({variant:Variants.DANGER,heading:'DQE',text:error.response.request.response}))
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }

            });
      }
    }
  };

  const handledownloadDQE = async() => {
    if(permission.includes("api_sm.download_dqe")) {
      const rowData: any = props.data;
      if (props.pk) {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_download}?marche__id=${rowData[props.pk]}`, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            'Content-Type': 'application/json',
          },

        })
            .then((response: any) => {
              if (response.data.length > 0) {
                const data: any[] = response.data;
                const dataset: any[] = data.map(obj => ({...obj, annule: 0}));

                const ws = XLSX.utils.json_to_sheet(dataset);

                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, 'dqe.xlsx');
              }


            })
            .catch((error: any) => {

            });

      }

    }
  }




  const { permission } = useContext(PermissionContext);

  return (
      <>

        <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            hidden={true}
            style={{ display: 'none' }}
            ref={(input) => (fileInputRef.current = input)}
        />
        <div className="btn-group btn-group-sm" role="group">
              <>
                <>
                { permission.includes("api_sm.upload_dqe") &&
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
                }
                  { permission.includes("api_sm.download_dqe") &&
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
                  }
                  { permission.includes("api_sm.upload_dqe") &&
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
                  }
                </>
              </>
        </div>


      </>



  );
};

export default DQE;
