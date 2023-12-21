import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {showAlert, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";
import * as XLSX from "xlsx";

type ActionRendererProps = {
  data:any;
  modelName:string;
  pk?:string;
  endpoint_upload?:string;
  endpoint_download?:string;
};

const ActionRenderer: React.FC<ActionRendererProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDisplayClick = () => {
    const rowData:any =  props.data  ;
    console.log(props.modelName)
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
            </>
          </>
          }

        </div>

      </>



  );
};

export default ActionRenderer;
