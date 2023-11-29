import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {show, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";
import {useDispatch} from "react-redux";
import usr from "../icons/user.png";

type AddFormProps = {
  fields:any[];
  title:string;
  img:string;
};

interface Opt {
    value:boolean;
    label:string;
}

const AddForm: React.FC<AddFormProps> = (props) => {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<any>({});
    const [error,setError]=useState(false);
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
        console.log(formData)

        if (form.checkValidity()) {
            setValidated(false)
            dispatch(show({variant:Variants.SUCCESS,heading:"Ajout Client",text:"ok"}))

        }
        else {
            setValidated(true)
        }


    }



    return (
      <>

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
                              background: `url(${props.img}) center / auto no-repeat`,

                          }}
                      />
                      <br />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                      <div className="row">
                          <div className="row">
                              <div className="col-md-12 text-start">
                                  <div className="mb-5">
                                      <h1 className="text-center">{props.title}</h1>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>


                  {props.fields.map((field,index) => (
                      <div className="col-md-6 text-start" key={index}>
                          <div className="mb-3">

                              <Form.Group className="w-100"  controlId={"validation"+index}>
                                  <Form.Label>
                                      <strong>
                                          {field.label +" "}
                                          <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                      </strong>
                                  </Form.Label>
                                  {
                                      field.type === 'BooleanField' ?

                                          <Form.Control
                                              as="select"
                                              name={field.name}
                                              required
                                              className="w-100"

                                              onChange={(e)=>handleSelectChange(e)}>
                                              <option></option>
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
                                                  onChange={(e)=>handleInputChange(e)}
                                              />
                                              :
                                              <Form.Control
                                                  name={field.name}
                                                  required
                                                  className="w-100"
                                                  type="text"
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
  );
};

export default AddForm;
