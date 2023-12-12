import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Redux-Toolkit/Store/Sotre";
import {hideModal as hideModalAdd} from "../../../Redux-Toolkit/Slices/AddDataGridModalSlice";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useRef, useState} from "react";
import {showAlert, Variants} from "../../../Redux-Toolkit/Slices/AlertSlice";
import AlertMessage from "../../AlertMessage/AlertMessage";

type AddDataGridModalProps = {
  title:string;
  img:string;
  endpoint_fields:string;
  endpoint_submit:string;
  endpoint_upload?:string|null;
};
interface Opt {
  value:boolean;
  label:string;
}

const AddDataGridModal: React.FC<AddDataGridModalProps> = (props) => {
  const dispatch = useDispatch();
  const { show,data,title,img,pk,pkValue } = useSelector((state: RootState) => state.addDataGridModal);
  const [fields,setFields]=useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [validated, setValidated] = useState(false);
  const fileInputRef:any = useRef(null);
  const handleClose = () => {
    dispatch(hideModalAdd())
    setValidated(false)


  }
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

  useEffect(() => {

    getFields();



  },[]);

  const getFields = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_fields}`,{
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
  const charger = () => {

    fileInputRef.current.click();
  };
  const handleFileChange = async(event:any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append(pk,pkValue);

        // Make a POST request using Axios
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_upload}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response as needed
        dispatch(showAlert({variant:Variants.SUCCESS,heading:props.title,text:response.data.message}))


      } catch (error:any) {
        // Handle errors
        dispatch(showAlert({variant:Variants.DANGER,heading:props.title,text:error.response.data.message}))
      }
    }
  };
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    formData[pk]=pkValue;

    const formDataObject = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObject.append(key, formData[key]);
      }
    }
    if (form.checkValidity()) {
      setValidated(false)
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_submit}`,formDataObject,{
        headers: {
          Authorization: `Token ${Cookies.get("token")}`,
          'Content-Type': 'application/json',

        },

      })
          .then((response:any) => {
            dispatch(showAlert({variant:Variants.SUCCESS,heading:props.title,text:response.data.message}))

          })
          .catch((error:any) => {

            dispatch(showAlert({variant:Variants.DANGER,heading:props.title,text:error.response.data.message}))
          });




    }
    else {
      setValidated(true)
    }

  }


  return (
      <>

        <Modal
            show={show}
            onHide={handleClose}
            className={"modal-xl"}
            animation={false}


        >
          <AlertMessage/>
          <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"  noValidate validated={validated} onSubmit={handleSubmit}>

          <Modal.Body style={{border:"none",background:"#f8f9fa" ,borderRadius:"25px"}} >

            <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

              <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                <div className="card-body" style={{border:"none"}}>

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


                      {fields.map((field,index) => (
                          <div className="col-md-6 text-start" key={index}>
                            <div className="mb-3">

                              <Form.Group className="w-100"  controlId={"validation"+index}>
                                <Form.Label>
                                  <strong>
                                    {field.label +" "}
                                    <span style={{ color: "rgb(255,0,0)", fontSize: 18, fontWeight: "bold" }}>
                                              *
                                          </span>
                                  </strong>
                                </Form.Label>
                                {
                                  field.name === pk ?
                                      <Form.Control
                                          name={field.name}
                                          required
                                          className="w-100"
                                          type="text"
                                          value={pkValue}
                                          readOnly


                                      />
                                      :
                                  field.type === 'BooleanField' ?

                                      <Form.Control
                                          as="select"
                                          name={field.name}
                                          required
                                          className="w-100"
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
                                              onChange={(e)=>handleInputChange(e)}
                                          />

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

                </div>
              </div>
            </div>





          </Modal.Body>
          <Modal.Footer style={{border:"none",background:"#f8f9fa"}}>
            <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }} type={"submit"}>
              <i className="fa fa-send" style={{marginRight:5 }}></i>
              Envoyer
            </Button>
            {
              props.endpoint_upload  &&
              <div>
                <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }} onClick={charger}>
                  <i className="fas fa-upload" style={{marginRight:5 }}></i>
                  Charger
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
              </div>
            }



          </Modal.Footer>
          </Form>
        </Modal>

      </>
  );
};

export default AddDataGridModal;
