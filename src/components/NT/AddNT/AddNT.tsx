import * as React from "react";
import AlertMessage from "../../AlertMessage/AlertMessage";
import AddForm from "../../AddForm/AddForm";
import customer from "../../icons/customer.png";

type AddNTProps = {
  //
};

const AddNT: React.FC<any> = () => {
  return (
      <>
        <AlertMessage/>

        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">


              <AddForm   title={"Nouveau Numero de travail"} img={customer}
                         endpoint_submit={"/sm/addnt/"}
                         endpoint_fields={"/forms/ntfields/?flag=f"}
                         endpoint_state={"/forms/clientfieldsstate/"}
              />


            </div>
          </div>
        </div>
      </>
  );
};

export default AddNT;
