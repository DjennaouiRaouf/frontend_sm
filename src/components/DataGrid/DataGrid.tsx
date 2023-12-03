import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import {ColDef} from "ag-grid-community";
import Cookies from "js-cookie";

type DataGridProps = {
  endpoint_rows:string;
  endpoint_cols:string;
};

const DataGrid: React.FC<DataGridProps> = (props) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
    const[rows,setRows]=useState([]);
    const[cols,setCols]=useState([]);
    const gridRef = useRef(null);
    const defaultColDefs: ColDef = {
        sortable: true,
        resizable: true,
        minWidth: 300,
        cellStyle: { textAlign: 'start'  }
    };



    const gridOptions:any = {
        pagination: true,
        domLayout: 'autoHeight',
        rowSelection: 'multiple',
        defaultColDef:defaultColDefs
    };


    const getCols = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_cols}`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setCols(response.data.fields);



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
          <div style={containerStyle}>
              <div style={{ width:"100%", height: '600px', boxSizing: 'border-box' }}>

                  <div style={gridStyle} className="ag-theme-alpine  ">
                      <AgGridReact ref={gridRef}
                                   rowData={rows} columnDefs={cols}
                                   gridOptions={gridOptions}
                                   suppressRowClickSelection={true}
                                   rowSelection={'multiple'}



                      />
                  </div>
              </div>
          </div>
      </>
    );
};

export default DataGrid;
