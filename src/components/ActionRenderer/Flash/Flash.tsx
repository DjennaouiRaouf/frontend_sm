import * as React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type FlashProps = {
  data:any;
  modelName:string;
  pk:any;
  onOpenModal: () => void;
};

const Flash: React.FC<any> = (props) => {
    const navigate=useNavigate();
    const stat = () => {
        const rowData: any = props.data;
        if (props.pk) {
            console.log()
            navigate('workstate', { state: { marche: rowData[props.pk]} })
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
              title="Afficher les Flash ou les Attachements "
              onClick={() => props.onOpenModal()}
          >
            <i className="fas fa-file-alt"></i>
          </button>
            <button
                className="btn btn-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                type="button"
                style={{ background: "#df162c", borderWidth: 0 }}
                title="Afficher les statistiques des travaux "
                onClick={stat}
            >
                <i className="fas fa-chart-line"></i>
            </button>
        </div>
      </>
  );
};

export default Flash;
