import * as React from "react";
import {useDispatch} from "react-redux";
import {showModal as displayModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {showModal as addModal} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
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
  const handleEditClick = () => {
    const rowData:any =  props.data  ;

    dispatch(displayModal({data:rowData}));
  };
  const handleDQEClick = () => {
    const rowData:any =  props.data  ;

    dispatch(addModal({data:rowData,title:props.title,img:props.img,pk:props.pk,pkValue:rowData[props.pk]}));
  };
  const handleListeDQEClick = () => {
    const rowData:any =  props.data  ;
    const targetRoute = '/liste_dqe';
    const dataObject = {
      pkValue:rowData[props.pk]
    };
    navigate(targetRoute, { state: dataObject });
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
          {
              props.modelName === 'Marche' &&
              <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  type="button"
                  style={{ background: "#df162c", borderWidth: 0 }}
                  title="Liste DQE"
                  onClick={handleListeDQEClick}
              >
                <i className="fas fa-list" />
              </button>

          }


        </div>

      </>



  );
};

export default ActionRenderer;
