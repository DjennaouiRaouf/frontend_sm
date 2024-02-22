import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { showAlert, Variants} from "../../../../Redux-Toolkit/Slices/AlertSlice";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import  risk from '../../../icons/risk.png';
import AlertMessage from "../../../AlertMessage/AlertMessage";
import {Typeahead} from "react-bootstrap-typeahead";
import {Transform} from "../../../Utils/Utils";

type AddCautionsProps = {

};

interface Opt {
  value:boolean;
  label:string;
}

const AddCautions: React.FC<AddCautionsProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [fields,setFields]=useState<any[]>([]);
  const [defaultState,setDefaultState]=useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [modelName, setModelName] = useState<string>("");
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  const mid = location.state;
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
    formData["marche"]=mid.marche



      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addcautions/`,Transform(formData),{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },

      })
          .then((response:any) => {

            dispatch(showAlert({variant:Variants.SUCCESS,heading:"Caution",text:response.data.message}))
            setFormData(defaultState);

          })
          .catch((error:any) => {
            dispatch(showAlert({variant:Variants.DANGER,heading:"Caution",text:error.response.request.response}))
          });






  }

  const getFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/cautionfields/`,{
      params:{
        flag:'f',
        marche:mid.marche
      },
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setFields(response.data.fields);
          setModelName(response.data.model);
          setLoading(false);

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
    getFields();

  },[]);
  useEffect(() => {
    getDdfaultState();

  },[]);

  const handleChange = (ref:any, op:any) => {
    if(op.length ===1 ){
      setFormData({
        ...formData,
        [ref]: op,
      })
    }else{
      delete formData[ref]
    }


  };


  return (
      <>
        {loading ? (

            <div className="container d-xl-flex justify-content-xl-center align-items-xl-center">
              <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{
                    width: 300,
                    height: 300,
                    margin: 0,
                    fontSize: 90,
                    color: "#dc162e"
                  }}
              />
            </div>

        ) : (
            <>
              <AlertMessage/>
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
                          background: `url(${risk}) center / auto no-repeat`,

                        }}
                    />
                    <br />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="mb-5">
                            <div className="card" style={{ height:'90px',width: "100%",background:'#ebebeb' }}>
                              <div className="card-body text-center">
                                <h5 className="text-center card-title">{'Ajouter une Caution'}</h5>
                                <h5 className="text-center card-title">{`Marché N° : ${mid.marche}` }</h5>
                              </div>
                            </div>
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
                                {
                                  field.required ?
                                    <span style={{ color: "rgb(255,0,0)", fontSize: 18, fontWeight: "bold" }}>
                                              *
                                          </span>
                                      :
                                      <span style={{ color: "rgb(255,255,255)", fontSize: 18, fontWeight: "bold" }}>

                                          </span>
                                }

                              </strong>
                            </Form.Label>
                            {
                              field.type === "PrimaryKeyRelatedField" ?
                                  <>

                                    <Typeahead

                                        labelKey={"label"}
                                        onChange={(o) => handleChange(field.name, o)}
                                        id={field.name}
                                        selected={formData[field.name] || []}
                                        options={field.queryset}

                                    />

                                  </>


                                  :
                                  field.type === 'BooleanField' ?

                                      <Form.Control
                                          as="select"
                                          name={field.name}
                                          required={field.required}
                                          className="w-100"
                                          value={formData[field.name] || '' }
                                          onChange={(e)=>handleSelectChange(e)}>

                                        {opt.map((item,index) => (
                                            <option key={index} value={String(item.value)}>{item.label}</option>
                                        ))}

                                      </Form.Control>


                                      : field.type === 'DateField' ?
                                          <Form.Control
                                              name={field.name}
                                              required={field.required}
                                              className="w-100"
                                              type="date"
                                              value={formData[field.name] || ''}
                                              onChange={(e)=>handleInputChange(e)}
                                          />
                                          : field.type === 'IntegerField' || field.type ==='DecimalField'  ?
                                              <Form.Control
                                                  name={field.name}
                                                  required={field.required}
                                                  className="w-100"
                                                  type="number"
                                                  value={formData[field.name] || 0}
                                                  step={0.01}
                                                  onChange={(e)=>handleInputChange(e)}
                                              />

                                          :
                                          <Form.Control
                                              name={field.name}
                                              required={field.required}
                                              className="w-100"
                                              type="text"
                                              value={formData[field.name] || ''}
                                              onChange={(e)=>handleInputChange(e)}
                                          />



                            }

                          </Form.Group>
                        </div>
                      </div>


                  ))}
                </div>
                <div
                    className="col-md-12"
                    style={{ textAlign: "right", marginTop: 5 }}>

                  <Button  type="submit" style={{ borderWidth: 0, background: "#d7142a" }}>
                    <i className="fas fa-plus" style={{marginRight:"10px"}}></i> Ajouter
                  </Button>

                </div>
              </Form>



            </>
        )}
        </>


  );
};

export default AddCautions;
