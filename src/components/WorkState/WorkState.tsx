import * as React from "react";
import {useLocation} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Plot from 'react-plotly.js';
import AlertMessage from "../AlertMessage/AlertMessage";
import {showAlert, Variants} from "../../Redux-Toolkit/Slices/AlertSlice";
import {useDispatch} from "react-redux";


type WorkStateProps = {
  //
};

const WorkState: React.FC<any> = () => {
    const location = useLocation();
    const mid = location.state;
    const[x,setX]=useState<any[]>([]);
    const[y1,setY1]=useState<any[]>([]);
    const[y2,setY2]=useState<any[]>([]);
    const dispatch=useDispatch();
    const[du,setDu]=useState<string>('');
    const[au,setAu]=useState<string>('');
  const getDataSet = async() => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/workstate/`,{
        params:{
            marche:mid.marche,
            date_after:du,
            date_before:au,

        },
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {


            setX(response.data.x)
            setY1(response.data.y1)
            setY2(response.data.y2)



        })
        .catch((error:any) => {

            dispatch(showAlert({variant:Variants.DANGER,heading:"Statistiques",text:error.response.data.message}))
        });


  }
  const search = () => {
      getDataSet()
  }


    const handleInputChangeDu = (event:any) => {
        // Update the state with the new input value

        setDu(event.target.value);
    };
    const handleInputChangeAu = (event:any) => {

        setAu(event.target.value);
    };



  return (
      <>
          <AlertMessage/>
          <div className="card mb-5">
          <div className="card-body">
              <h6 className="card-title">
                  <i
                      className="fas fa-chart-line"
                      style={{ fontSize: 44, color: "#dc162e" }}
                  />
                  &nbsp; Saisir la date de début et de fin des attachements
              </h6>
              <div className="input-group mt-3 mb-3">
                  <span className="input-group-text" >Du</span>
                  <input className="form-control" type="date" onChange={handleInputChangeDu}  value={du}/>
                  <span className="input-group-text">Au</span>
                  <input className="form-control" type="date" onChange={handleInputChangeAu } value={au} />
                  <button className="btn btn-primary" type="button" onClick={search} style={{ background: "#df162c", borderWidth: 0 }}>
                      <i className="fas fa-search" />
                  </button>
              </div>


          </div>
          </div>
          {
              (x.length >= 1 && y1.length >= 1) &&
                  <div className="card">
                      <div className="card-body">
                          <div className="plot-container">
                              <Plot
                                  data={[
                                      {
                                          x: x,
                                          y: y1,
                                          type: 'scatter',
                                          mode: 'lines+markers',
                                          name: 'Quantités cumulées en cours ',

                                      },
                                      {
                                          x: x,
                                          y: y2,
                                          type: 'scatter',
                                          mode: 'lines+markers',
                                          name: 'Quantité contractuelle à atteindre',

                                      },


                                  ]}

                                  layout={{title: `Statistiques des Travaux du Marché ${mid.marche}`}}
                                  style={{width:"100%"}}
                              />
                          </div>


                      </div>
                  </div>

          }


    </>
  );
};

export default WorkState;
