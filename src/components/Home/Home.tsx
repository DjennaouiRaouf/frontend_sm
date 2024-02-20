import * as React from "react";
import {Carousel} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import "./Home.css";
type HomeProps = {
    //
};

const Home: React.FC<any> = () => {
    const [pics,setPics]=useState<any[]>([]);
    const [timeline,setTimeline]=useState<any[]>([]);
    const getImages = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/?type=H`,{
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
    const getTimeline = async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/timeline/`,{
            headers:{
                "Content-Type":"application/json",
            }
        })
            .then((response) => {
                setTimeline(response.data);

            })
            .catch((error) => {

            });

    }
    useEffect(() => {
        getImages();


    },[]);
    useEffect(() => {
        getTimeline();


    },[]);
    return <>
        <div className="container">
            <Carousel className="w-100 d-block mb-5" controls={false} interval={1000} fade={true} indicators={true} style={{
                borderWidth: "1px",borderRadius: "8px"}}>
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

        <div className="container">

        {
            timeline.length > 0 &&
            <div className="container">
                <h3 className="card-title mb-5">Nos Marchés </h3>
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-timeline2">
                            {timeline.map((item,index) => (
                            <div className="timeline " key={index} >
                                <a href="#" className="timeline-content mt-5 float-on-hover">
                                    <span className="year">{item.year}</span>
                                    <div className="inner-content">
                                        <h3 className="title">{item.title}</h3>
                                        <p className="description">
                                            {item.description}
                                        </p>
                                    </div>
                                </a>
                            </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>


        }
        </div>

    </>;
};

export default Home;
