import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useNavigate} from "react-router-dom";

type ActionRendererProps = {
  data:any;
  img:string;
  title:string;
  modelName:string;
  pk:string;
};

const ActionRenderer: React.FC<ActionRendererProps> = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
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

export default ActionRenderer;
