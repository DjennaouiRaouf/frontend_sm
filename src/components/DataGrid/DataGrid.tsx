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
    const[rows,setRows]=useState <any[]>([]);
    const[cols,setCols]=useState <any[]>([]);
    const gridRef = useRef(null);
    const defaultColDefs: ColDef = {
        sortable: true,
        resizable: true,
        minWidth: 300,
        cellStyle: { textAlign: 'start'  },

    };



    const gridOptions:any = {
        pagination: true,
        domLayout: 'autoHeight',
        rowSelection: 'multiple',
        defaultColDef:defaultColDefs,

    };


    const ActionsRenderer: React.FC<any>  = (props:any) => {
        const handleButtonClick = () => {
            // Access the row data using props.data
            const rowData = props.data;
            console.log('Button Clicked for Row:', rowData);
            // Add your custom actions here
        };

        return (
            <div className="btn-group btn-group-sm" role="group">
                <button
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    type="button"
                    style={{ background: "#df162c", borderWidth: 0 }}
                    title="Editer"
                >
                    <i className="far fa-edit" />
                </button>
                <button
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    type="button"
                    style={{ background: "#df162c", borderWidth: 0 }}
                    title="Visualiser"
                >
                    <i className="far fa-eye" />
                </button>
            </div>


        );
    };
    const getCols = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}${props.endpoint_cols}`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                const updatedCols:any[] = [...response.data.fields, {
                    headerName:'Action',
                    cellRenderer:ActionsRenderer
                }];

                setCols(updatedCols);



            })
            .catch((error:any) => {

            });

    }

    const getRowHeight = (params:any ) => {
        // Access row data using params.data
        const rowData = params.data;

        // Example: Calculate row height based on the length of the description field
        const descriptionLength = rowData.description ? rowData.description.length : 0;
        return 25 + descriptionLength * 2; // Adjust this calculation based on your content
    };
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
