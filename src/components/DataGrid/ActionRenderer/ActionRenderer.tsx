import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {showModal as addModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";

type ActionRendererProps = {
  data:any;
  img:string;
  title:string;
  modelName:string;
  pk:string;
};

const ActionRenderer: React.FC<ActionRendererProps> = (props) => {
  const dispatch = useDispatch();
  const handleEditClick = () => {
    const rowData:any =  props.data  ;

    dispatch(displayModal({data:rowData,title:props.title,img:props.img}));
  };
  if(props.modelName === 'Marche'){}
  const handleDQEClick = () => {
    const rowData:any =  props.data  ;
    console.log(rowData[props.pk])
    dispatch(addModal({data:rowData,title:props.title,img:props.img,pk:props.pk,pkValue:rowData[props.pk]}));
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
              onClick={handleEditClick}
          >
            <i className="far fa-eye" />
          </button>
          {
            props.modelName === 'Marche' &&
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Ajouter DQE"
                  onClick={handleDQEClick}
              >
                <i className="fas fa-plus" />
              </button>

          }


        </div>

      </>



  );
};

export default ActionRenderer;
