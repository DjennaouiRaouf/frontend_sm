import * as React from "react";
import AlertMessage from "../../AlertMessage/AlertMessage";

import hook from '../../icons/hook.png';
import AddForm from "../../AddForm/AddForm";



const AddSiteForm: React.FC<any> = () => {


  return (
      <>
        <AlertMessage/>
        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">

              <AddForm   title={"Nouveau Site"} img={hook}
                         endpoint_fields={"/forms/sitefields/?flag=f"}
                         endpoint_state={"/forms/sitefieldsstate/"}
                         endpoint_submit={"/sm/addsite/"} />


            </div>
          </div>
        </div>





      </>



  );
};

export default AddSiteForm;
