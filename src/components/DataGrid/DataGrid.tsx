import * as React from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import {ColDef} from "ag-grid-community";
import Cookies from "js-cookie";
import DisplayDataGridModal from "../DisplayDataGridModal/DisplayDataGridModal";
import ActionRenderer from "./ActionRenderer/ActionRenderer";
import AddDataGridModal from "./AddDataGridModal/AddDataGridModal";
import layout from "../icons/layout.png";
import {useModal} from "../Context/FilterModalContext/FilterModalContext";

type DataGridProps = {
  endpoint_rows:string;
  endpoint_cols:string;
  img:string;
  title:string;
  filterState?:string;
};

const DataGrid: React.FC<DataGridProps> = (props) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '650px' }), []);
    const gridStyle = useMemo(() => ({ height: '650px', width: '100%' }), []);
    const[rows,setRows]=useState <any[]>([]);
    const[cols,setCols]=useState <any[]>([]);
    const[modelName,setModelName]=useState <string>("");
    const[pk,setPk]=useState <string>("");
    const [gridApi, setGridApi] = useState<any>(null);
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
        multiSortKey:'ctrl',
        animateRows:true,
    };






    return (
      <>
          <DisplayDataGridModal cols={cols}   />
          { /*ajouter dqe au marché */
              modelName === "Marche"&&

              <AddDataGridModal img={layout} title={"DQE"} endpoint_fields={"/forms/dqefields/?flag=f"} endpoint_submit={"/sm/adddqe/"}
                                endpoint_upload={"/sm/importdqe/"} />
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
