import * as React from "react";
import {Alert, Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux-Toolkit/Store/Sotre";
import {useEffect, useState} from "react";
import { hideAlert} from "../../Redux-Toolkit/Slices/AlertSlice";


type AlertMessageProps = {
  //
};

const AlertMessage: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { variant,show,heading,text } = useSelector((state: RootState) => state.alertReducer);

    useEffect(() => {
        let timeoutId:any;


            timeoutId = setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);


        return () => {
            clearTimeout(timeoutId);
        };
    }, [show, dispatch]);


    return (
      <>
          <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
          <Toast show={show} style={{background:variant}} >
              <Toast.Header closeButton={false}>
                  <strong className="me-auto">{heading}</strong>
              </Toast.Header>
              <Toast.Body>{text}</Toast.Body>
          </Toast>
          </ToastContainer>
      </>
  );
};

export default AlertMessage;
