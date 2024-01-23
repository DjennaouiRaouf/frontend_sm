import * as React from "react";
import AddForm from "../AddForm/AddForm";
import customer from "../icons/customer.png";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Button, Form} from "react-bootstrap";
import {showAlert, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";
import axios from 'axios'
import {useNavigate} from "react-router-dom";

type SignupProps = {
  //
};

const Signup: React.FC<any> = () => {
    const [fields,setFields]=useState<any[]>([]);
    const [defaultState,setDefaultState]=useState<any>({});
    const [formData, setFormData] = useState<any>({});
    const [validated, setValidated] = useState(false);
    const [confirmepassword,setConfirmepassword]=useState('');
    const navigate=useNavigate();
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/userfields/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setFields(response.data.fields);



            })
            .catch((error:any) => {

            });

    }
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        if (form.checkValidity()) {
            setValidated(false)
            if(formData.password===confirmepassword){

            }else{
                setFormData(defaultState);
                setConfirmepassword('');
            }

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/adduser/`,formDataObject,{
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .then((response:any) => {

                    setFormData(defaultState);
                    setConfirmepassword('');
                    navigate('/');

                })
                .catch((error:any) => {
                    setFormData(defaultState);
                    setConfirmepassword('');
                    navigate('/');
                });
        }
        else {
            setValidated(true)
        }
    }

    const getDdfaultState = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/userfieldsstate/`,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response:any) => {
                setDefaultState(response.data.state);
                setFormData(response.data.state);

            })
            .catch((error:any) => {

            });

    }
    useEffect(() => {
        getDdfaultState();
        getFields();



    },[]);


    return (
      <>
          <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

              <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                  <div className="card-body">
                      <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"
                            noValidate validated={validated} onSubmit={handleSubmit} >

                          <div className="row" style={{ marginBottom: 25, textAlign: "left" }}>
                              <div
                                  className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                                  style={{ display: "inline", textAlign: "center", marginBottom: 25 }}
                              >
                                  <div
                                      style={{
                                          height: "150px",
                                          background: `url(${null}) center / auto no-repeat`,

                                      }}
                                  />
                                  <br />
                              </div>
                              <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                                  <div className="row">
                                      <div className="row">
                                          <div className="col-md-12 text-start">
                                              <div className="mb-5">
                                                  <h1 className="text-center">{'Creer un compte'}</h1>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {fields.map((field,index) => (
                                  <div className="col-md-6 text-start" key={index}>
                                      <div className="mb-3">

                                          <Form.Group className="w-100"  controlId={"validation"+index}>
                                              <Form.Label>
                                                  <strong>
                                                      {field.label  +" "}
                                                      <span style={{ color: "rgb(255,0,0)", fontSize: 18, fontWeight: "bold" }}>
                                              *
                                          </span>
                                                  </strong>
                                              </Form.Label>
                                              {
                                                  field.name ==="password" ?
                                                      <Form.Control
                                                          name={field.name}
                                                          required
                                                          className="w-100"
                                                          type="password"
                                                          value={formData[field.name]}
                                                          onChange={(e)=>handleInputChange(e)}
                                                      />
                                                      :
                                                      field.name === "confirmepassword"?
                                                          <Form.Control
                                                              name={"confirmepassword"}
                                                              required
                                                              className="w-100"
                                                              type="password"
                                                              value={confirmepassword}
                                                              onChange={(e)=>setConfirmepassword(e.target.value)}
                                                          />
                                                          :
                                                          <Form.Control
                                                              name={field.name}
                                                              required
                                                              className="w-100"
                                                              type="text"
                                                              value={formData[field.name]}
                                                              onChange={(e)=>handleInputChange(e)}
                                                          />








                                              }


                                          </Form.Group>


                                      </div>
                                  </div>


                              ))}
                          </div>
                          <ul style={{width:'50%'}}>

                                  <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas trop ressembler à vos autres informations
                                          personnelles.
                                        </span>
                                  </li>
                                  <li className="text-start">
                                      Votre mot de passe doit contenir au minimum 8 caractères
                                  </li>
                                  <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas être un mot de passe couramment utilisé.
                                        </span>
                                  </li>
                                  <li className="text-start">
                                        <span style={{ color: "var(--body-quiet-color)" }}>
                                          Votre mot de passe ne peut pas être entièrement numérique.
                                        </span>
                                  </li>

                          </ul>
                          <div
                              className="col-md-12"
                              style={{ textAlign: "right", marginTop: 5 }}>

                              <Button  type="submit" style={{ borderWidth: 0, background: "#d7142a" }}>
                                  <i className="fas fa-plus" style={{marginRight:"10px"}}></i> Creer
                              </Button>

                          </div>
                      </Form>






                  </div>
              </div>
          </div>
      </>
  );
};

export default Signup;
