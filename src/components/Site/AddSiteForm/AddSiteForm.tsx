import * as React from "react";
import {useEffect, useRef, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
import AlertMessage from "../../AlertMessage/AlertMessage";
import {useDispatch} from "react-redux";
import AddForm from "../../AddForm/AddForm";
import hook from '../../icons/hook.png';



const AddSiteForm: React.FC<any> = () => {
  const dispatch = useDispatch();
    const [sField,setSField]=useState([]);
  const getSiteFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/sitefields/?flag=f`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response:any) => {
          setSField(response.data.fields);
        })
        .catch((error:any) => {

        }).finally(() => {

        });
  }



    useEffect(() => {
        getSiteFields();
    },[])



  return (
      <>

        <AlertMessage/>

        <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

          <div className=" mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">


              <AddForm fields={sField}  title={"Nouveau Site"} img={hook} endpoint={"/sm/addsite/"} />


            </div>
          </div>
        </div>





      </>



  );
};

export default AddSiteForm;
