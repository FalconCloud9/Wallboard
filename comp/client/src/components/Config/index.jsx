import React, {useState} from "react";
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import { saveWindows } from '../../action';
import './index.css';
import WindowForm from '../Forms/WindowForm';

const Config = (props) => {
  const {windows, dispatch} = props;
  const [blockModalShow, setBlockModalShow] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState(null);

  const handleSave = (title) => {
    const windowOrder = window.length + 1;
    const windowObj = {
      order: windowOrder,
      title,
      id: `window-${windowOrder}`
    }
    dispatch(saveWindows([...props.windows, windowObj]));
    setBlockModalShow(false);
  }

  const handleNewWindowClick = () => {
    setSelectedWindow(null);
    setBlockModalShow(true);
  }

  const handleBlockClick = () => {
    setSelectedWindow()
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row p-4">
        <div className="col-3 window-block mr-3" onClick={handleNewWindowClick}>
          <i className="fa fa-plus"/>
        </div>
        {
          windows.map( window => {
            return(
              <div key={window.id} className="col-3 window-block mr-3" onClick={(evt, window) => handleBlockClick(window)}>
                <h2>{window.title}</h2>
              </div>
            )
          })
        }
      </div>
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
          <WindowForm handleSave={handleSave} selectedWindow={selectedWindow} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
const mapStateToProps = (store) => ({
  windows: store.window.windows
});

export default connect(mapStateToProps)(Config);