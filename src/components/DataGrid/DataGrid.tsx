import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import {ColDef} from "ag-grid-community";
import Cookies from "js-cookie";
import DisplayDataGridModal from "./DisplayDataGridModal/DisplayDataGridModal";
import ActionRenderer from "./ActionRenderer/ActionRenderer";
import AddDataGridModal from "./AddDataGridModal/AddDataGridModal";

type DataGridProps = {
  endpoint_rows:string;
  endpoint_cols:string;
  img:string;
  title:string;
};

const DataGrid: React.FC<DataGridProps> = (props) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
    const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
    const[rows,setRows]=useState <any[]>([]);
    const[cols,setCols]=useState <any[]>([]);
    const[modelName,setModelName]=useState <string>("");
    const[pk,setPk]=useState <string>("");

    const gridRef = useRef(null);
    const defaultColDefs: ColDef = {
        sortable: true,
        resizable: true,
        minWidth: 300,
        cellStyle: { textAlign: 'start', border: "none"  },

    };



    const gridOptions:any = {
        pagination: true,

        defaultColDef:defaultColDefs,

    };



    const getCols = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_cols}`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setModelName(response.data.models);
                setPk(response.data.pk);

                const updatedCols:any[] = [...response.data.fields, {
                    headerName:'Action',
                    cellRenderer:ActionRenderer,
                    cellRendererParams:{
                        img:props.img,
                        title:props.title,
                        modelName:response.data.models,
                        pk:response.data.pk
                    }
                }];

                setCols(updatedCols);



            })
            .catch((error:any) => {

            });

    }



    const getRows = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_rows}`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                setRows(response.data);



            })
            .catch((error:any) => {

            });

    }

    useEffect(() => {
        getCols();
        getRows();


    },[]);



    return (
      <>
          <DisplayDataGridModal cols={cols}   />
          {
              modelName === "Marche"&&
              <AddDataGridModal cols={cols}   />
          }
          <div style={containerStyle}>

              <div style={{ width:"100%", height: '650px', boxSizing: 'border-box' }}>

                  <div style={gridStyle} className="ag-theme-alpine  " >
                      <AgGridReact ref={gridRef}
                                   rowData={rows} columnDefs={cols}
                                   gridOptions={gridOptions}



                      />
                  </div>
              </div>
          </div>
      </>
    );
};

export default DataGrid;
