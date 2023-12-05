import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Redux-Toolkit/Store/Sotre";
import {Button, Form, Modal} from "react-bootstrap";
import {hideModal} from "../../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import {useEffect} from "react";


type DisplayDataGridModalProps = {
    cols:any[];
 
};

const DisplayDataGridModal: React.FC<DisplayDataGridModalProps> = (props) => {
  const dispatch = useDispatch();
  const { show,data,title,img } = useSelector((state: RootState) => state.displayDataGridModal);
  const handleClose = () => {
      dispatch(hideModal())

  }


  return (
      <>
        <Modal
            show={show}
            onHide={handleClose}
            className={"modal-xl"}
            animation={false}


        >
          
          <Modal.Body style={{border:"none",background:"#f8f9fa" ,borderRadius:"25px"}} >

              <div className="container-fluid" style={{marginTop:"20px" , width:"100%"}}>

                  <div className=" mb-3" style={{border:"none",background:"transparent"}}>
                      <div className="card-body" style={{border:"none"}}>
                          <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3">

                              <div className="row" style={{ marginBottom: 25, textAlign: "left" }}>
                                  <div
                                      className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                                      style={{ display: "inline", textAlign: "center", marginBottom: 25 }}
                                  >
                                      <div
                                          style={{
                                              height: "150px",
                                              background: `url(${img}) center / auto no-repeat`,

                                          }}
                                      />
                                      <br />
                                  </div>
                                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                                      <div className="row">
                                          <div className="row">
                                              <div className="col-md-12 text-start">
                                                  <div className="mb-5">
                                                      <h1 className="text-center">{title}</h1>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>


                                  {Object.keys(data).map((key:string) => (
                                      <div className="col-md-6 text-start" key={key}>
                                          <div className="mb-3">

                                                              <Form.Group className="w-100" >

                                                                  <Form.Label >
                                                                      {props.cols.map((col,index) => (
                                                                          col.field=== key &&
                                                                          <strong  key={index}>
                                                                              {col.headerName}
                                                                          </strong>
                                                                      ))}



                                                                  </Form.Label>

                                                                  <Form.Label
                                                                      className="w-100"
                                                                      >
                                                                      {data[key]}
                                                              </Form.Label>
                                                              </Form.Group>



                                          </div>
                                      </div>


                                  ))}
                              </div>
                          </Form>
                      </div>
                  </div>
              </div>





          </Modal.Body>
          <Modal.Footer style={{border:"none",background:"#f8f9fa"}}>
            <Button variant="secondary btn-sm" style={{ borderWidth: 0, background: "#d7142a" }} onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>

      </>
  );
};

export default DisplayDataGridModal;
