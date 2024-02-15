import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Redux-Toolkit/Store/Sotre";
import {Button, Form, Modal} from "react-bootstrap";
import {hideModal} from "../../Redux-Toolkit/Slices/DisplayDataGridModalSlice";
import Humanize from "../Utils/Utils";



type DisplayDataGridModalProps = {
    cols:any[];
    title:string,
    img:string,
 
};

const DisplayDataGridModal: React.FC<DisplayDataGridModalProps> = (props) => {
  const dispatch = useDispatch();
  const { show,data, } = useSelector((state: RootState) => state.displayDataGridModal);



    const handleClose = () => {
       dispatch(hideModal())

  }

  const renderer = (item:any) => {
        const items1:any[]=['taux_realise','montant_factureHT','montant_avf_remb','montant_ava_remb','montant_rb','montant_rg','montant_factureTTC',
        "montant_precedent","montant_cumule",'montant_mois','ht','ttc',"montant","prix_u","prix_q","prix_contr",'prix_attache','valeur_1',"valeur_2",'valeur_3']
        if(items1.includes(item)){
            return Humanize(data[item])+" DA"
        }
        const items2:any[]=["tva",'retenue_garantie','rabais','rg',"taux",'debut','fin',"taux_avance","remb"]
        if(items2.includes(item)){
              return Humanize(data[item])+" %"
        }
        return data[item]

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
                                              background: `url(${props.img}) center / auto no-repeat`,

                                          }}
                                      />
                                      <br />
                                  </div>
                                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                                      <div className="row">
                                          <div className="row">
                                              <div className="col-md-12 text-start">
                                                  <div className="mb-5">
                                                      <div className="card" style={{ height:'90px',width: "100%",background:'#ebebeb' }}>
                                                          <div className="card-body text-center">
                                                              <h1 className="text-center card-title">{props.title}</h1>
                                                          </div>
                                                      </div>

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
                                                                      {props.cols.map((c,index) => (
                                                                          c.field=== key ?
                                                                          <strong  key={index}>
                                                                              {c.headerName+' :'}
                                                                          </strong>:

                                                                          c.children &&

                                                                                    c.children.map((i:any,j:any) => (

                                                                                        i.field=== key &&
                                                                                        <strong  key={index}>
                                                                                            {i.headerName+" "+c.headerName+' :'}
                                                                                        </strong>

                                                                                    ))







                                                                      ))}



                                                                  </Form.Label>
                                                                  {
                                                                      data[key] === true ?
                                                                          <Form.Label
                                                                              className="w-100"
                                                                          >
                                                                              Oui
                                                                          </Form.Label>
                                                                      :
                                                                          data[key] === false ?
                                                                              <Form.Label
                                                                                  className="w-100"
                                                                              >
                                                                                  Non
                                                                              </Form.Label>
                                                                              :
                                                                              data[key] === null ?
                                                                                  <Form.Label
                                                                                      className="w-100"
                                                                                  >
                                                                                      -
                                                                                  </Form.Label>
                                                                                  :
                                                                                  data[key] !== null &&
                                                                                  <Form.Label
                                                                                      className="w-100"
                                                                                  >
                                                                                      {renderer(key)}
                                                                                  </Form.Label>


                                                                  }


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
