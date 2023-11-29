import * as React from "react";
import {useEffect, useRef, useState} from "react";
import contrat from './contract.png'
import axios from "axios";
import Cookies from "js-cookie";
import {Console} from "inspector";
import AlertMessage from "../../AlertMessage/AlertMessage";
import AddForm from "../../AddForm/AddForm";
import site from "../../icons/location.png";
import {useDispatch} from "react-redux";



const AddMarcheForm: React.FC<any> = () => {

    const dispatch = useDispatch();
    const [mField,setMField]=useState([]);
    const getMarcheFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/marchefields//?flag=f`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response:any) => {
                setMField(response.data.fields);
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


                        <AddForm fields={mField}  title={"Nouveau Site"} img={site} endpoint={"/sm/addmarche/"} />


                    </div>
                </div>
            </div>





        </>
  );
};

export default AddMarcheForm;
