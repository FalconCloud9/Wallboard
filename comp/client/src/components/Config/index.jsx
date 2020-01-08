import React, {useState} from "react";
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import './index.css';

const Config = (props) => {
  const [blockModalShow, setBlockModalShow] = useState(false);
  console.log(props);
  return (
    <div className="container-fluid">
      Config
      <Modal
        show={blockModalShow}
        onHide={() => setBlockModalShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add New Window
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Todo: Add form */}
        </Modal.Body>
      </Modal>
    </div>
  );
}
const mapStateToProps = (store) => ({
  windows: store.window.windows
});

export default connect(mapStateToProps)(Config);