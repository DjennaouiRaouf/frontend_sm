import * as React from "react";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect,  useState} from "react";
import AlertMessage from "../AlertMessage/AlertMessage";
import {useModal} from "../Context/FilterModalContext/FilterModalContext";
import {Typeahead} from "react-bootstrap-typeahead";
import {useNavigate, useSearchParams} from "react-router-dom";

type FilterModalProps = {
  title:string;
  img?:string;
  endpoint_fields:string;


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
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    console.log()
    const url_tmp:string[]=[];
    Object.entries(formData).forEach(([key, value], index) => {
      const val:string=String(value);

      if(index === 0){

        url_tmp.push(`${key}=${encodeURIComponent(val)}`);
      }
      if(index >= 1){
        url_tmp.push(`&${key}=${encodeURIComponent(val)}`);
      }

    });

    const queryParamsString = new URLSearchParams(searchParams).toString(); // Convert query parameters to string
    const newLocation = {
      pathname: '', // New route path
      search: queryParamsString, // Append existing query parameters
    };
    navigate(newLocation);

    navigate(`?${url_tmp.join('')}`)
    closeModal()
    setFormData({})



  }
  const handleChange = (ref:any, op:any) => {
    if(op.length ===1 ){
      setFormData({
        ...formData,
        [ref]: op[0].value,
      })
    }else{
      delete formData[ref]
    }


  };


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
                                <div className="card" style={{ height:'90px',width: "100%",background:'#ebebeb' }}>
                                  <div className="card-body text-center">
                                    <h1 className="text-center card-title">{props.title}</h1>
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
                                    {field.label +" "}
                                   
                                </Form.Label>
                                {
                                   field.type === "ModelChoiceFilter" || field.type === "PrimaryKeyRelatedField"?
                                      <>


                                          <Typeahead

                                              labelKey={"label"}
                                              onChange={(o) => handleChange(field.name, o)}
                                              id={field.name}
                                              options={field.queryset}

                                          />




                                      </>


                                          :
                                          field.type === 'BooleanFilter' || field.type === 'BooleanField' ?

                                              <Form.Control
                                                  as="select"
                                                  name={field.name}

                                                  className="w-100"
                                                  onChange={(e)=>handleSelectChange(e)}>
                                                  {opt.map((item,index) => (
                                                      <option key={index} value={String(item.value)}>{item.label}</option>
                                                  ))}

                                              </Form.Control>
                                                  : field.choices ?
                                                  <Form.Control
                                                      as="select"
                                                      name={field.name}
                                                      required={field.required}
                                                      className="w-100"
                                                      value={formData[field.name]|| ''}
                                                      onChange={(e)=>handleSelectChange(e)}>

                                                    {field.choices.map((item:any,index:any) => (
                                                        <option key={index} value={String(item)}>{item}</option>
                                                    ))}

                                                  </Form.Control>
                                              : field.type === 'DateFilter' || field.type === 'DateField'  ?
                                                  <Form.Control
                                                      name={field.name}

                                                      className="w-100"
                                                      type="date"
                                                      onChange={(e)=>handleInputChange(e)}
                                                  />
                                                  : field.type === 'NumberFilter' || field.type === 'IntegerField' ?
                                                      <Form.Control
                                                          name={field.name}
                                                          className="w-100"
                                                          type="number"
                                                          value={formData[field.name] || 0}
                                                          step={0.01}
                                                          disabled={field.readOnly || false}
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

