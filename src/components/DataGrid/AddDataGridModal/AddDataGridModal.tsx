import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Redux-Toolkit/Store/Sotre";

type AddDataGridModalProps = {
  cols:any[];
  endpoint_add:string;
  endpoint_fields:any[];
};

const AddDataGridModal: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { show,data,title,img,pk,pkValue } = useSelector((state: RootState) => state.addDataGridModal);
  return <div>{pk+pkValue}</div>;
};

export default AddDataGridModal;
