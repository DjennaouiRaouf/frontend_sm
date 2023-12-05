import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Button, Carousel, Form} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import AlertMessage from "../AlertMessage/AlertMessage";
import {useDispatch} from "react-redux";
import {showAlert, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";


const LoginForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [pics,setPics]=useState<any[]>([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });





  const { authenticated,setAuthenticated } = useContext(AuthContext);
  const navigate=useNavigate();
  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/`,{
      headers:{
        "Content-Type":"application/json",
      }
    })
        .then((response) => {
          setPics(response.data);

        })
        .catch((error) => {

        });

  }



  const authentification = async(e: any) => {

    e.preventDefault();
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('password', formData.password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,fd,{
      withCredentials:true,
    })
        .then((response:any) => {
          setAuthenticated(Cookies.get("token"))
          navigate('/home');



        })
        .catch((error:any) => {
          console.log(error)
          dispatch(showAlert({variant:Variants.DANGER,heading:"Connexion",text:error.response.data.message}))

        });



  }



  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getImages();


  },[]);

  return (

      <>

        <AlertMessage/>
        <div className="col-xl-10 col-xxl-8 container px-4 py-5" style={{borderRadius:"8px",
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          msTransform: "translateY(-50%)",
          WebkitTransform: "translateY(-50%)",
          OTransform: "translateY(-50%)"

        }}>
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start" >
              <Carousel className="w-100 d-block" controls={false} interval={2000} fade={true} indicators={true} style={{borderWidth: "1px",borderRadius: "8px"}}>
                {pics.map((item,index) => (
                    <Carousel.Item key={index}  style={{borderWidth: "1px",borderRadius: "8px"}}>
                      <img
                          src={item.src}
                          alt={""}
                          height={500}
                          className="d-block w-100"
                          style={{borderWidth: "1px",borderRadius: "8px"}}
                      />

                    </Carousel.Item>
                ))}
              </Carousel>

            </div>

            <div className="col-md-10 col-lg-5 mx-auto">

              <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3"
                    noValidate validated={validated}
                    onSubmit={authentification}>
                <div className="form-floating mb-3">
                  <Form.Group className="w-100"  controlId="validation1">
                    <Form.Control
                        name="username"
                        required
                        className="w-100"
                        type="text"
                        placeholder="Nom d'utilisateur" value={formData.username}
                        onChange={(e)=>handleInputChange(e)}
                    />

                  </Form.Group>



                </div>
                <div className="form-floating mb-3">
                  <Form.Group className="w-100"  controlId="validation2">
                    <Form.Control
                        name="password"
                        required
                        className="w-100"
                        type="password"
                        placeholder="Mot de passe" value={formData.password}
                        onChange={(e)=>handleInputChange(e)}
                    />
                  </Form.Group>


                </div>

                <Button type="submit" className="w-100" style={{ background: "#df162c", borderWidth: 0 }}   >
                  Connexion</Button>
                <hr className="my-4" />

              </Form>
            </div>
          </div>
        </div>
      </>



  );
};

export default LoginForm;