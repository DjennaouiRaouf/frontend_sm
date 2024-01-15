import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {
  fetchFields, fetchStateFields,
  setPk,
  showModal as editModal
} from "../../../Redux-Toolkit/Slices/EditDataGridModalSlice";
import EditDataGridModal from "../../EditDataGridModal/EditDataGridModal";
import settings from '../../icons/settings.png'


type DQEActionProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const DQEAction: React.FC<DQEActionProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDisplayClick = () => {
    const rowData:any =  props.data  ;
    dispatch(displayModal({data:rowData}));

  };


  const handleEditDQE = () => {
    const rowData:any =  props.data  ;

    if(props.pk){

      dispatch(setPk({pk:props.pk,pkValue:rowData[props.pk]}))
      dispatch(fetchFields({ endpoint_fields:'/forms/dqefields/?flag=f' }));
      dispatch(fetchStateFields({ pk: props.pk,pkValue:rowData[props.pk],endpoint_state:"/forms/dqefieldsstate/" }));
      dispatch(editModal())

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
                title="Visualiser"
                onClick={handleDisplayClick}
            >
              <i className="far fa-eye" />
            </button>
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


        </div>

      </>



  );
};

export default DQEAction;
