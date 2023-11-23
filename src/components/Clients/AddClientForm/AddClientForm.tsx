import * as React from "react";
import  usr from "../../icons/user.png"
import {useRef, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
import {Button, Carousel, Form} from "react-bootstrap";
import AlertMessage from "../../AlertMessage/AlertMessage";
import {useDispatch} from "react-redux";
import {show, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";



interface FormState {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:string,
  Cosider_Client:string,
}
interface Opt {
  value:string;
  label:string;
}
const AddClientForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    Code_Client  : '',
    Libelle_Client: '',
    NIF:'',
    Raison_Social:'',
    Numero_Registre_Commerce:'',
    Type_Client:'',
    Cosider_Client:"0",
  });


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
    if (form.checkValidity()) {
      const fd:FormData=new FormData();

      fd.append("code_client",formData.Code_Client );
      fd.append("type_client",formData.Type_Client.toString() );
      fd.append("est_client_cosider",formData.Cosider_Client);
      fd.append("libelle_client",formData.Libelle_Client );
      fd.append("nif", formData.NIF);
      fd.append("raison_social",formData.Raison_Social);
      fd.append("num_registre_commerce",formData.Numero_Registre_Commerce );


      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addclient/`,fd,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },

      })
          .then((response:any) => {

            dispatch(show({variant:Variants.SUCCESS,heading:"Ajout Client",text:response.data.message}))



          })
          .catch((error:any) => {
            dispatch(show({variant:Variants.DANGER,heading:"Ajout Client",text:error.response.data.message}))

          });

    }
    else {

        setValidated(true)

    }


  }


const opt:Opt[] = [
  {
    value: "0",
    label: 'Non',
  },
  {
    value: "1",
    label: 'Oui',
  },

];
return (
    <>

            <AlertMessage/>

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
                              height: "100%",
                              background: `url(${usr}) center / auto no-repeat`,

                            }}
                        />
                        <br />
                      </div>
                      <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                        <div className="row">
                          <div className="row">
                            <div className="col-md-12 text-start">
                              <div className="mb-5">
                                <h1 className="text-center">Ajouter un Client</h1>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 text-start">
                            <div className="mb-3">
                              <Form.Group className="w-100"  controlId="validation11">
                                <Form.Label>
                                  <strong>
                                    Code Client{" "}
                                    <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                  </strong>
                                </Form.Label>
                                <Form.Control
                                    name="Code_Client"
                                    required
                                    className="w-100"
                                    type="text"
                                    value={formData.Code_Client}
                                    onChange={(e)=>handleInputChange(e)}
                                />
                                
                              </Form.Group>


                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-6 text-start">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation12">
                            <Form.Label>
                              <strong>
                                Libelle{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>
                            <Form.Control
                                name="Libelle_Client"
                                required
                                className="w-100"
                                type="text"
                                value={formData.Libelle_Client}
                                onChange={(e)=>handleInputChange(e)}
                            />
                            
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-6 text-start">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation13">
                            <Form.Label>
                              <strong>
                                NIF{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>
                            <Form.Control
                                name="NIF"
                                required
                                className="w-100"
                                type="text"
                                value={formData.NIF}
                                onChange={(e)=>handleInputChange(e)}
                            />
                            
                          </Form.Group>

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation14">
                            <Form.Label>
                              <strong>
                                Est Cosider client{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>

                            <Form.Select
                                name="Cosider_Client"
                                required
                                className="w-100"
                                value={formData.Cosider_Client}
                                onChange={(e)=>handleSelectChange(e)}
                            >
                              {opt.map((item,index) => (
                                  <option key={index} value={item.value}>{item.label}</option>
                              ))}

                              </Form.Select>
                          </Form.Group>

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">

                            <Form.Group className="w-100"  controlId="validation15">
                              <Form.Label>
                                <strong>
                                  Type{" "}
                                  <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                </strong>
                              </Form.Label>
                              <Form.Control
                                  name="Type_Client"
                                  required
                                  className="w-100"
                                  type="text"
                                  value={formData.Type_Client}
                                  onChange={(e)=>handleInputChange(e)}
                              />
                              
                            </Form.Group>


                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation16">
                            <Form.Label>
                              <strong>
                                Raison social{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>
                            <Form.Control
                                name="Raison_Social"
                                required
                                className="w-100"
                                type="text"
                                value={formData.Raison_Social}
                                onChange={(e)=>handleInputChange(e)}
                            />
                            
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation17">
                            <Form.Label>
                              <strong>
                                Numero registre commerce{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>
                            <Form.Control
                                name="Numero_Registre_Commerce"
                                required
                                className="w-100"
                                type="text"
                                value={formData.Numero_Registre_Commerce}
                                onChange={(e)=>handleInputChange(e)}
                            />
                            
                          </Form.Group>

                        </div>
                      </div>

                      <div
                          className="col-md-12"
                          style={{ textAlign: "right", marginTop: 5 }}
                      >
                        <Button  type="submit" style={{ borderWidth: 0, background: "#d7142a" }}>
                        <i className="fas fa-plus" style={{marginRight:"10px"}}></i> Ajouter
                      </Button>

                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            

      
      

    </>



);
};

export default AddClientForm;
