import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux-Toolkit/Store/Sotre";
import {hideModal as hideEditModal} from "../../Redux-Toolkit/Slices/EditDataGridModalSlice";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect,  useState} from "react";
import AlertMessage from "../AlertMessage/AlertMessage";

type EditDataGridModalProps = {
  title?:string;
  img?:string;
  endpoint_fields?:string;
  endpoint_submit?:string;
  getRows: (param: any) => void;

};
interface Opt {
  value:boolean;
  label:string;
}

const EditDataGridModal: React.FC<EditDataGridModalProps> = (props) => {
  const dispatch = useDispatch();
  const { show,dataField,dataState,pk,pkValue } = useSelector((state: RootState) => state.editDataGridModal);
  const [formData, setFormData] = useState<any>({});

  const handleClose = () => {
    dispatch(hideEditModal())

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



  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const formDataObject = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObject.append(key, formData[key]);
      }
    }
    await axios.put(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_submit}${pkValue}/`,formDataObject,{
      headers: {

        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          props.getRows(``);

        })
        .catch((error:any) => {
          console.log(error)
        });

    dispatch(hideEditModal())


  }



  useEffect(() => {
    setFormData(dataState);

  },[dataState]);




  return (
      <>
            <Modal
                show={show}
                onHide={handleClose}
                className={"modal-xl"}
                animation={false}


            >
              <AlertMessage/>
              <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"  noValidate  onSubmit={handleSubmit}>

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


                          {dataField.map((field,index) => (
                              <div className="col-md-6 text-start" key={index}>
                                <div className="mb-3">

                                  <Form.Group className="w-100"  controlId={"validation"+index}>
                                    <Form.Label>
                                      <strong>
                                        {field.label +" "+field.readOnly}
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
                                                disabled={field.readOnly || false}
                                                value={formData[field.name]|| ''}
                                                className="w-100"
                                                onChange={(e)=>handleInputChange(e)}
                                            />
                                            <datalist id={field.name}>
                                              {field.queryset.map((qs:any, key:any) => (
                                                  <option  key={key} value={qs.id}>{qs.id +"  "+qs.libelle}</option>
                                              ))}

                                            </datalist>

                                          </>

                                          :
                                          field.name === pk ?
                                              <Form.Control
                                                  name={field.name}
                                                  required
                                                  className="w-100"
                                                  type="text"
                                                  value={pkValue}
                                                  readOnly
                                                  disabled={field.readOnly || false}

                                              />
                                              :
                                              field.type === 'BooleanField' ?

                                                  <Form.Control
                                                      as="select"
                                                      name={field.name}
                                                      required
                                                      value={formData[field.name]|| ''}
                                                      className="w-100"
                                                      disabled={field.readOnly || false}
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
                                                          value={formData[field.name]|| ''}
                                                          disabled={field.readOnly || false}
                                                          onChange={(e)=>handleInputChange(e)}
                                                      />
                                                      :
                                                      <Form.Control
                                                          name={field.name}
                                                          required
                                                          className="w-100"
                                                          type="text"
                                                          value={formData[field.name]|| ''}
                                                          disabled={field.readOnly || false}
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




                </Modal.Footer>
              </Form>
            </Modal>

        


      </>
  );


};

export default EditDataGridModal;
