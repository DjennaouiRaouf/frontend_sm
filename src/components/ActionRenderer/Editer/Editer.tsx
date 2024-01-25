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
import {
  fetchFields,
  fetchStateFields,
  setPk,
  showModal as editModal
} from "../../../Redux-Toolkit/Slices/EditDataGridModalSlice";
import EditDataGridModal from "../../EditDataGridModal/EditDataGridModal";
import settings from "../../icons/settings.png";


type EditerProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const Editer: React.FC<EditerProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleEdit = () => {

      const rowData:any =  props.data  ;
      if (props.pk){
        dispatch(setPk({pk:props.pk,pkValue:rowData[props.pk]}))
        dispatch(fetchFields({ endpoint_fields:'/forms/marchefields/?flag=f' }));
        dispatch(fetchStateFields({ pk: props.pk,pkValue:rowData[props.pk],endpoint_state:"/forms/marchefieldsstate/" }));
        dispatch(editModal())

      }



  };








  const { permission } = useContext(PermissionContext);

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
                      title="Modifier"
                      onClick={handleEdit}
                  >
                    <i className="far fa-edit" />
                  </button>
              <EditDataGridModal title={"Modifier le Marche"}
                                 img={settings}
                                 getRows={props.updateRows}
                                 endpoint_submit={'/sm/updatemarche/'}/>

            </>
          </>
        </div>


      </>



  );
};

export default Editer;


