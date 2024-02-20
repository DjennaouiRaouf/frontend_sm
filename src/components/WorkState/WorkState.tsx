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
    const[y,setY]=useState<any[]>([]);
    const dispatch=useDispatch();
    const[du,setDu]=useState<string>('');
    const[au,setAu]=useState<string>('');
  const getDataSet = async() => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/workstate/?marche=${mid.marche}&mm_min=${du.split('-')[1]}&mm_max=${au.split('-')[1]}&aa_min=${du.split('-')[0]}&aa_max=${du.split('-')[0]}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {


            setX(response.data.x)
            setY(response.data.y)



        })
        .catch((error:any) => {
            console.log(error)
            dispatch(showAlert({variant:Variants.DANGER,heading:"Statistiques",text:'Mauvaise requete'}))
        });


  }
  const search = () => {
      if(du && au){
          getDataSet()
      }else{
          dispatch(showAlert({variant:Variants.DANGER,heading:"Statistiques",text:'Veuillez inserer la date debut et de fin  '}))
      }



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
                  <input className="form-control" type="month" onChange={handleInputChangeDu} value={du}/>
                  <span className="input-group-text">Au</span>
                  <input className="form-control" type="month" onChange={handleInputChangeAu } value={au} />
                  <button className="btn btn-primary" type="button" onClick={search}>
                      <i className="fas fa-search" />
                  </button>
              </div>


          </div>
          </div>
          {
              (x.length >= 1 && y.length >= 1) &&
                  <div className="card">
                      <div className="card-body">
                          <div className="plot-container">
                              <Plot
                                  data={[
                                      {
                                          x: x,
                                          y: y,
                                          type: 'scatter',
                                          mode: 'lines+markers',

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
