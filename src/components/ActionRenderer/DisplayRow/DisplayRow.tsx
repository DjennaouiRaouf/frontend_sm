import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";



type DisplayRowProps = {
  data:any;
  modelName:string;
  pk?:any;
  endpoint_upload?:string;
  endpoint_download?:string;
  updateRows: (params:any) => void;

};

const DisplayRow: React.FC<DisplayRowProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDisplayClick = () => {
    const rowData:any =  props.data  ;
    dispatch(displayModal({data:rowData}));

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
              title="Visualiser"
              onClick={handleDisplayClick}
          >
            <i className="far fa-eye" />
          </button>

        </div>

      </>



  );
};
export default DisplayRow;
