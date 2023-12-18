import * as React from "react";
import AlertMessage from "../../AlertMessage/AlertMessage";
import customer from '../../icons/customer.png'
import AddForm from "../../AddForm/AddForm";




const AddClientForm: React.FC<any> = () => {

  return (
    <>

            <AlertMessage/>

            <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

              <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                <div className="card-body">


                      <AddForm   title={"Nouveau Client"} img={customer}
                                 endpoint_submit={"/sm/addclient/"}
                                 endpoint_fields={"/forms/clientfields/?flag=f"}
                                endpoint_state={"/forms/clientfieldsstate/"}

                      />


                </div>
              </div>
            </div>
            

      
      

    </>



);
};

export default AddClientForm;
