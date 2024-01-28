import * as React from "react";

type AttacherProps = {
  data:any;
  onOpenModal: () => void;
};


const Attacher: React.FC<AttacherProps> = (props) => {

  return (
      <div className="btn-group btn-group-sm" role="group">
        <>
          <>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    type="button"
                    style={{ background: "#df162c", borderWidth: 0 }}
                    title="Attacher"
                    onClick={() => props.onOpenModal()}
                >
                  <i className="fas fa-link" />
                </button>

          </>
        </>
      </div>

  );
};

export default Attacher;
