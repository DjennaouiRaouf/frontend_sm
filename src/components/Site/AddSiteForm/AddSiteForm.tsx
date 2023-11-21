import * as React from "react";
import {useRef, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";

import site from '../../icons/location.png';
import {Button, Form} from "react-bootstrap";


interface FormState {
  code_site:string,
  code_filiale :string ,
  code_region :string ,
  libelle_site :string ,
  code_agence :string ,
  type_site :number ,
  code_division :string,
  code_commune_site :string ,
  jour_cloture_mouv_rh_paie :string ,
  date_ouverture_site : string ,
  date_cloture_site: string ,
}

const AddSiteForm: React.FC<any> = () => {

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    code_site:'',
    code_filiale :'' ,
    code_region :'' ,
    libelle_site :'' ,
    code_agence :'' ,
    type_site :0 ,
    code_division :'',
    code_commune_site :'' ,
    jour_cloture_mouv_rh_paie :'' ,
    date_ouverture_site : '' ,
    date_cloture_site: '',
  });



  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const fd:FormData=new FormData();
      fd.append('code_site',formData.code_site)
      fd.append('code_filiale',formData.code_filiale)
      fd.append('code_region',formData.code_region)
      fd.append('libelle_site',formData.libelle_site)
      fd.append('code_agence',formData.code_agence)
      fd.append('type_site',formData.type_site.toString())
      fd.append('code_division',formData.code_division)
      fd.append('code_commune_site',formData.code_commune_site)
      fd.append('jour_cloture_mouv_rh_paie',formData.jour_cloture_mouv_rh_paie)
      fd.append('date_ouverture_site',formData.date_ouverture_site)
      fd.append('date_cloture_site',formData.date_cloture_site)

      // Form is valid, submit the data or perform other actions
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addsite/`,fd,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },

      })
          .then((response:any) => {

            setFormData({
              code_site:'',
              code_filiale :'' ,
              code_region :'' ,
              libelle_site :'' ,
              code_agence :'' ,
              type_site :0 ,
              code_division :'',
              code_commune_site :'' ,
              jour_cloture_mouv_rh_paie :'' ,
              date_ouverture_site : '' ,
              date_cloture_site: ''

            })


          })
          .catch((error:any) => {


          });


    }
    else {

      setValidated(true)

    }


  }





  return (
      <>


        <div className="container-fluid" style={{marginTop:"20px", width:"100%"}}>

          <div className="mb-3" style={{border:"none",background:"transparent"}}>
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
                          background: `url(${site}) center / auto no-repeat`,

                        }}
                    />

                    <br />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="mb-3">
                            <h1 className="text-center">Ajouter un Site</h1>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 text-start">
                        <div className="mb-3">
                          <Form.Group className="w-100"  controlId="validation01">
                            <Form.Label>
                              <strong>
                                Code Site{" "}
                                <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                              </strong>
                            </Form.Label>
                            <Form.Control
                                name="code_site"
                                required
                                className="w-100"
                                type="text"
                                value={formData.code_site}
                                onChange={(e)=>handleInputChange(e)}
                            />
                            <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation02">
                        <Form.Label>
                          <strong>
                            Code filiale{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="code_filiale"
                            required
                            className="w-100"
                            type="text"
                            value={formData.code_filiale}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">

                      <Form.Group className="w-100"  controlId="validation03">
                        <Form.Label>
                          <strong>
                            Code region{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="code_region"
                            required
                            className="w-100"
                            type="text"
                            value={formData.code_region}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>


                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation04">
                        <Form.Label>
                          <strong>
                            Libelle{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="libelle_site"
                            required
                            className="w-100"
                            type="text"
                            value={formData.libelle_site}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>


                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation05">
                        <Form.Label>
                          <strong>
                            Code agence{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="code_agence"
                            required
                            className="w-100"
                            type="text"
                            value={formData.code_agence}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation06">
                        <Form.Label>
                          <strong>
                            Code division{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="code_division"
                            required
                            className="w-100"
                            type="text"
                            value={formData.code_division}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation07">
                        <Form.Label>
                          <strong>
                            Code commune{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="code_commune_site"
                            required
                            className="w-100"
                            type="text"
                            value={formData.code_commune_site}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation08">
                        <Form.Label>
                          <strong>
                            Jour cloture mouv rh paie{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="jour_cloture_mouv_rh_paie"
                            required
                            className="w-100"
                            type="text"
                            value={formData.jour_cloture_mouv_rh_paie}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation09">
                        <Form.Label>
                          <strong>
                            Date ouverture site{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="date_ouverture_site"
                            required
                            className="w-100"
                            type="date"
                            value={formData.date_ouverture_site}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <Form.Group className="w-100"  controlId="validation010">
                        <Form.Label>
                          <strong>
                            Date cloture site{" "}
                            <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                          </strong>
                        </Form.Label>
                        <Form.Control
                            name="date_cloture_site"
                            required
                            className="w-100"
                            type="date"
                            value={formData.date_cloture_site}
                            onChange={(e)=>handleInputChange(e)}
                        />
                        <Form.Control.Feedback>Mot de passe</Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>





                  <div
                      className="col-md-12"
                      style={{ textAlign: "right", marginTop: 5 }}
                  >

                    <Button  type="submit" style={{ borderWidth: 0, background: "#d7142a" }} >
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

export default AddSiteForm;
