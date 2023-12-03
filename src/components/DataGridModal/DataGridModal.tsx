import * as React from "react";
import {Modal} from "react-bootstrap";

type DataGridModalProps = {
  //
};

const DataGridModal: React.FC<any> = () => {

  return (
      <>
        <Modal

            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Do not even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </>
  );
};

export default DataGridModal;
