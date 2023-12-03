import * as React from "react";

import AlertMessage from "../../AlertMessage/AlertMessage";

import layout from "../../icons/layout.png";
import AddForm from "../../AddForm/AddForm";




const AddDQEForm: React.FC<any> = () => {




  return (
      <>
        <AlertMessage/>
        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">
              <AddForm  title={"Nouveau DQE"} img={layout}
                       endpoint_fields={"/forms/dqefields/?flag=f"}
                       endpoint_submit={"/sm/adddqe/"}
                       endpoint_state={"/forms/dqefieldsstate/"}
              />
            </div>
          </div>
        </div>
      </>
  );
};

export default AddDQEForm;

