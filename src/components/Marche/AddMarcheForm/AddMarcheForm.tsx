import * as React from "react";
import agreement from '../../icons/agreement.png'
import AlertMessage from "../../AlertMessage/AlertMessage";
import AddForm from "../../AddForm/AddForm";





const AddMarcheForm: React.FC<any> = () => {



    return (
        <>
            <AlertMessage/>
            <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
                <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                    <div className="card-body">
                        <AddForm   title={"Nouveau Marché"} img={agreement}
                                   endpoint_fields={'/forms/marchefields/?flag=f'}
                                   endpoint_state={"/forms/marchefieldsstate/"}
                                   endpoint_submit={"/sm/addmarche/"} />
                    </div>
                </div>
            </div>
        </>
  );
};

export default AddMarcheForm;
