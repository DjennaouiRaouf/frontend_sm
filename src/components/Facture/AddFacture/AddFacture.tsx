import * as React from "react";
import AlertMessage from "../../AlertMessage/AlertMessage";
import AddForm from "../../AddForm/AddForm";
import bill from "../../icons/bill.png"




const AddFacture: React.FC<any> = () => {



  return (
      <>
        <AlertMessage/>
        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">
              <AddForm   title={"Nouvelle Facture"} img={bill}
                         endpoint_fields={'/forms/facturefields/?flag=f'}
                         endpoint_state={"/forms/marchefieldsstate/"}
                         endpoint_submit={"/sm/addfacture/"} />
            </div>
          </div>
        </div>
      </>
  );
};

export default AddFacture;
