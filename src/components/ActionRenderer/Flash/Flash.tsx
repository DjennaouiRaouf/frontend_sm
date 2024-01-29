import * as React from "react";
import {Button} from "react-bootstrap";

type FlashProps = {
  data:any;
  modelName:string;
  pk:any;
  onOpenModal: () => void;
};

const Flash: React.FC<any> = (props) => {
  return (
      <>
        <div className="btn-group btn-group-sm" role="group">
          <button
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              type="button"
              style={{ background: "#df162c", borderWidth: 0 }}
              title="Afficher les flash "
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
                title="Afficher les Attachements "
                onClick={() => props.onOpenModal()}
            >
                <i className="fas fa-list"></i>
            </button>

        </div>
      </>
  );
};

export default Flash;
