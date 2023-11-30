import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import {ColDef} from "ag-grid-community";

type DataGridProps = {
  rows:any[],
  columns:any[],
};

const DataGrid: React.FC<DataGridProps> = (props) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
    const [paginationPageSize, setPaginationPageSize] = useState(20);
    const gridRef = useRef(null);
    const defaultColDefs: ColDef = {
        sortable: true,
        resizable: true,
        minWidth: 300,
        cellStyle: { textAlign: 'start'  }
    };



    const gridOptions:any = {
        pagination: true,
        domLayout: 'autoHeight', // or 'autoHeight' for auto-sizing
        paginationPageSize: paginationPageSize,
        rowSelection: 'multiple',
        defaultColDef:defaultColDefs
    };








    return (
      <>
          <div style={containerStyle}>
              <div style={{ width:"100%", height: '600px', boxSizing: 'border-box' }}>

                  <div style={gridStyle} className="ag-theme-alpine  ">
                      <AgGridReact ref={gridRef}
                                   rowData={props.rows} columnDefs={props.columns}
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
