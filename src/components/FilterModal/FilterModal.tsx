import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect,  useState} from "react";
import AlertMessage from "../AlertMessage/AlertMessage";
import {useModal} from "../Context/FilterModalContext/FilterModalContext";

type FilterModalProps = {
  title:string;
  img?:string;
  endpoint_fields:string;
  filter: (url:string) => void;

};
interface Opt {
  value:boolean|null;
  label:string;
}

const FilterModal: React.FC<FilterModalProps> = (props) => {
  const { showModal, closeModal } = useModal();
  const [fields,setFields]=useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});


  const opt:Opt[] = [
    {
      value:null,
      label:'Tout',
    },

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


  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const url_tmp:string[]=[];
    Object.entries(formData).forEach(([key, value], index) => {
      if(index === 0){

        url_tmp.push(`${key}=${value}`);
      }
      if(index >= 1){
        url_tmp.push(`&${key}=${value}`);
      }

    });
    props.filter(url_tmp.join(''));


    closeModal()
    setFormData({})



  }


  return (
      <>

        <Modal
            show={showModal}
            onHide={closeModal}
            className={"modal-xl"}
            animation={false}


        >
          <AlertMessage/>
          <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"  onSubmit={handleSubmit}>

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
                                    {field.label +" "}
                                   
                                </Form.Label>
                                {
                                  field.type === "PrimaryKeyRelatedField"?
                                      <>
                                        <Form.Control
                                            name={field.name}
                                            as="input"
                                            list={field.name}
                                            className="w-100"
                                            value={formData[field.name] || ''}
                                            onChange={(e)=>handleInputChange(e)}
                                        />
                                        <datalist id={field.name}>
                                          {field.queryset.map((qs:any, key:any) => (
                                              <option  key={key} value={qs.id}>{qs.libelle}</option>
                                          ))}

                                        </datalist>

                                      </>


                                          :
                                          field.type === 'BooleanField' ?

                                              <Form.Control
                                                  as="select"
                                                  name={field.name}

                                                  className="w-100"
                                                  onChange={(e)=>handleSelectChange(e)}>

                                                {opt.map((item,index) => (
                                                    <option key={index} value={String(item.value)}>{item.label}</option>
                                                ))}

                                              </Form.Control>
                                              : field.type === 'DateField' ?
                                                  <Form.Control
                                                      name={field.name}

                                                      className="w-100"
                                                      type="date"
                                                      onChange={(e)=>handleInputChange(e)}
                                                  />
                                                  :
                                                  <Form.Control
                                                      name={field.name}

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
                <i className="fas fa-search" style={{marginRight:5 }}></i>
                Rechercher
              </Button>




            </Modal.Footer>
          </Form>
        </Modal>

      </>
  );
};

export default FilterModal;

