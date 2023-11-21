import * as React from "react";
import logo from "../icons/logo.png"


const PageFooter: React.FC<any> = () => {
  return(
      <>
          <footer>
              <div className="container py-4 py-lg-5">
                  <div className="row justify-content-center">
                      <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
                          <h3 className="fs-6">Nos filiales</h3>
                          <ul className="list-unstyled">
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;GROUPE
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER CANALISATIONS
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER TRAVAUX PUBLICS
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER CONSTRUCTION
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;OUVRAGES D'ART
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;CARRIERES
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;PROMOTION
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;COSIDER ALREM
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;ENGINEERING
              </span>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
              <span style={{ color: "rgb(51, 51, 51)" }}>
                COSIDER&nbsp;GEOTECHNIQUE
              </span>
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
                          <h3 className="fs-6">COSIDER SPA</h3>
                          <ul className="list-unstyled">
                              <li>
                                  <a className="link-secondary" href="#">
                                      Capital Social :&nbsp;
                                      <strong>
                <span style={{ color: "rgb(0, 0, 0)" }}>
                  17&nbsp;800 000 000 DA
                </span>
                                      </strong>
                                  </a>
                              </li>
                              <li>
                                  <a className="link-secondary" href="#">
                                      Siège Social :&nbsp;
                                      <strong>
                <span style={{ color: "rgb(102, 102, 102)" }}>
                  03 Rue des Frères Bouadou, Bir Mourad Raïs, Alger
                </span>
                                      </strong>
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div className="col-lg-3 text-center text-lg-start d-flex flex-column flex-fill align-items-center order-first align-items-lg-start order-lg-last align-items-xxl-end item social">
                          <div className="fw-bold d-flex align-items-center mb-2" />
                          <img src={logo} width={150} />
                          <p className="text-muted copyright" />
                      </div>
                  </div>
                  <hr />
              </div>
          </footer>


      </>
  );
};

export default PageFooter;
