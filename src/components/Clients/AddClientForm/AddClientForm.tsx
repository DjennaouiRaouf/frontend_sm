import * as React from "react";
import  usr from "../../icons/user.png"
import {useEffect, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
import AlertMessage from "../../AlertMessage/AlertMessage";

import AddForm from "../../AddForm/AddForm";




const AddClientForm: React.FC<any> = () => {
  const [cField,setCField]=useState([]);


  const getClientFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/clientfields/?flag=f`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response:any) => {
          setCField(response.data.fields);
        })
        .catch((error:any) => {

        }).finally(() => {

        });
  }

    useEffect(() => {
        getClientFields();
    },[])

  return (
    <>

            <AlertMessage/>

            <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

              <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                <div className="card-body">


                      <AddForm fields={cField}  title={"Nouveau Client"} img={usr} endpoint={"/sm/addclient/"} />


                </div>
              </div>
            </div>
            

      
      

    </>



);
};

export default AddClientForm;
