import * as React from "react";

import AlertMessage from "../../../AlertMessage/AlertMessage";
import bill from "../../../icons/bill.png"
import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { showAlert, Variants} from "../../../../Redux-Toolkit/Slices/AlertSlice";
import {RootState} from "../../../../Redux-Toolkit/Store/Sotre";
import {hideModal3 as hideCautionsModal} from "../../../../Redux-Toolkit/Slices/AddDataGridModalSlice";



interface Opt {
  value:boolean;
  label:string;
}

const AddCautions: React.FC<any> = () => {
  const [validated, setValidated] = useState(false);
  const { variant,show,heading,text } = useSelector((state: RootState) => state.alertReducer);
  const { showAddForm3,pk3 } = useSelector((state: RootState) => state.addDataGridModal);
  const dispatch = useDispatch();
  const [fields,setFields]=useState<any[]>([]);
  const [defaultState,setDefaultState]=useState<any>({});
  const [formData, setFormData] = useState<any>({});

  const opt:Opt[] = [

    {
      value: false,
      label: 'Non',
    },
    {
      value: true,
      label: 'Oui',
    },

  ];

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };


  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    formData["marche"]=pk3

    const formDataObject = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObject.append(key, formData[key]);
      }
    }
    if (form.checkValidity()) {
      setValidated(false)
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/AddCautions/`,formDataObject,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },

      })
          .then((response:any) => {

            dispatch(showAlert({variant:Variants.SUCCESS,heading: "Caution",text:response.data.message}))
            setFormData(defaultState);
          })
          .catch((error:any) => {
            dispatch(showAlert({variant:Variants.DANGER,heading:"Caution",text:error.response.data.message}))
          });




    }
    else {
      setValidated(true)
    }


  }

  const getFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/cautionfields/?flag=f`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setFields(response.data.fields);



        })
        .catch((error:any) => {

        });

  }


  const getDdfaultState = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/cautionfieldsstate/`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
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
  const handleClose = () => {
    dispatch(hideCautionsModal())

  }




  return (
      <>

        <Modal
            show={showAddForm3}
            onHide={handleClose}
            className={"modal-xl"}
            animation={false}


        >
          <AlertMessage/>
          <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"
                noValidate validated={validated} onSubmit={handleSubmit} >

            <Modal.Body style={{border:"none",background:"#f8f9fa" ,borderRadius:"25px"}} >
              <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>
                <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                  <div className="card-body">


                    <div className="row" style={{ marginBottom: 25, textAlign: "left" }}>
                      <div
                          className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                          style={{ display: "inline", textAlign: "center", marginBottom: 25 }}
                      >
                        <div
                            style={{
                              height: "150px",
                              background: `url(${bill}) center / auto no-repeat`,

                            }}
                        />
                        <br />
                      </div>
                      <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                        <div className="row">
                          <div className="row">
                            <div className="col-md-12 text-start">
                              <div className="mb-5">
                                <h1 className="text-center">{`Caution du Marche ${pk3}` }</h1>
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
                                  field.type === "PrimaryKeyRelatedField"?
                                      <>
                                        <Form.Control
                                            name={field.name}
                                            as="input"
                                            required
                                            list={field.name}
                                            className="w-100"
                                            value={formData[field.name]}
                                            onChange={(e)=>handleInputChange(e)}
                                        />
                                        <datalist id={field.name}>
                                          {field.queryset.map((qs:any, key:any) => (
                                              <option  key={key} value={qs.id}>{qs.id +"  "+qs.libelle}</option>
                                          ))}

                                        </datalist>

                                      </>


                                      :
                                      field.type === 'BooleanField' ?

                                          <Form.Control
                                              as="select"
                                              name={field.name}
                                              required
                                              className="w-100"
                                              value={formData[field.name]}
                                              onChange={(e)=>handleSelectChange(e)}>

                                            {opt.map((item,index) => (
                                                <option key={index} value={String(item.value)}>{item.label}</option>
                                            ))}

                                          </Form.Control>


                                          : field.type === 'DateField' ?
                                              <Form.Control
                                                  name={field.name}
                                                  required
                                                  className="w-100"
                                                  type="date"
                                                  value={formData[field.name]}
                                                  onChange={(e)=>handleInputChange(e)}
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

                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{border:"none",background:"#f8f9fa"}}>
              <Button  type="submit" style={{ borderWidth: 0, background: "#d7142a" }}>
                <i className="fas fa-plus" style={{marginRight:"10px"}}></i> Ajouter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>);




};

export default AddCautions;



