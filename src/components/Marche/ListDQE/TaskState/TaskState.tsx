import * as React from "react";
import {useLocation, useParams, useSearchParams} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Plot from 'react-plotly.js';

import {useDispatch} from "react-redux";


type TaskStateProps = {
  //
};

const TaskState: React.FC<any> = () => {
  const [searchParams] = useSearchParams();
  const { mid } = useParams();
  const marche_id:string=encodeURIComponent(String(mid));
  const[x,setX]=useState<any[]>([]);
  const[y1,setY1]=useState<any[]>([]);
  const[y2,setY2]=useState<any[]>([]);

  const getDataSet = async() => {

    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/dqestate/?marche__id=${marche_id}`,{

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


        });


  }

    useEffect(() => {
        getDataSet()
    },[]);




  return (
      <>


        {
            (x.length >= 1 && y1.length >= 1 && y2.length >= 1) &&
            <div className="card">
              <div className="card-body">
                <div className="plot-container">
                  <Plot
                      data={[
                        {
                            x: x,
                            y: y1,
                            name: 'quantités réalisées jusqu\'à présent',
                            type: 'bar'

                        },
                          {
                              x: x,
                              y: y2,
                              name: 'quantités contractuelles',
                              type: 'bar'

                          },





                      ]}



                      layout={{title: `Statistiques des Traches du Marché ${mid}`,
                          barmode: 'stack',
                          xaxis: {title: 'Code de la Tache'},
                          yaxis: {title: 'Quantité'},




                  }}
                      style={{width:"100%"}}
                  />
                </div>


              </div>
            </div>

        }


      </>
  );
};



export default TaskState;
