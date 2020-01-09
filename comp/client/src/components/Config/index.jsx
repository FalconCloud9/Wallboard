import React, {useState} from "react";
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';
import { saveCanvas } from '../../action';
import './index.css';
import CanvasForm from '../Forms/CanvasForm';

const Config = (props) => {
  const {canvasList, dispatch} = props;
  const [blockModalShow, setBlockModalShow] = useState(false);

  const handleSave = (title) => {
    const canvasOrder = canvasList.length + 1;
    const newCanvasObj = {
      order: canvasOrder,
      title,
      id: `canvas-${canvasOrder}`
    }
    dispatch(saveCanvas([...props.canvasList, newCanvasObj]));
    setBlockModalShow(false);
  }

  const handleNewCanvasClick = () => {
    setBlockModalShow(true);
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row p-4">
        <div className="col-3 canvas-block mr-3" onClick={handleNewCanvasClick}>
          <i className="fa fa-plus"/>
        </div>
        {
          canvasList.map( canvas => {
            return (
              <Link
                key={canvas.id}
                className="canvas-block-link col-3 mr-3"
                to={`/${canvas.id}/edit`}
              >
                <h2>{canvas.title}</h2>
              </Link>
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
            Add New Canvas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CanvasForm handleSave={handleSave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Config);