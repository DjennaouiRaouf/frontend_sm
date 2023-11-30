import * as React from "react";
import {useEffect,useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AlertMessage from "../../AlertMessage/AlertMessage";
import AddForm from "../../AddForm/AddForm";
import layout from "../../icons/layout.png";




const AddDQEForm: React.FC<any> = () => {

  const [dqField,setDQField]=useState([]);
  const getMarcheFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqefields/?flag=f`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response:any) => {
          setDQField(response.data.fields);
        })
        .catch((error:any) => {

        }).finally(() => {

        });
  }



  useEffect(() => {
    getMarcheFields();
  },[])



  return (
      <>
        <AlertMessage/>
        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">
              <AddForm fields={dqField}  title={"Nouveau DQE"} img={layout} endpoint={"/sm/adddqe/"} />
            </div>
          </div>
        </div>
      </>
  );
};

export default AddDQEForm;

