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

  const handleSave = ({title, singleWindow}) => {
    const canvasOrder = canvasList.length + 1;
    const newCanvasObj = {
      id: `canvas-${canvasOrder}`,
      order: canvasOrder,
      title,
      windows: [],
      single: singleWindow
    }
    dispatch(saveCanvas([...props.canvasList, newCanvasObj]));
    setBlockModalShow(false);
  }

  const handleNewCanvasClick = () => {
    setBlockModalShow(true);
  }

  const handleDeleteClick = (evt, canvasId) => {
    evt.preventDefault();
    const updatedFilter = canvasList.filter( canvas => {
      return (
        canvas.id !== canvasId
      )
    });
    dispatch(saveCanvas(updatedFilter));
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row p-4">
        <div className="col-12 p-0">
          <h2>Configuration Page</h2>
        </div>
      <div className="col-3 canvas-block mr-3 mb-2" onClick={handleNewCanvasClick}>
        <h2>Create new Canvas</h2>
        <i className="fa fa-plus"/>
      </div>
        {
          canvasList.map( canvas => {
            return (
              <Link
                key={canvas.id}
                className="canvas-block-link col-3 mr-3 mb-2 position-relative"
                to={`/${canvas.id}/edit`}
              >
                <div className="delete-btn" onClick={(evt) => handleDeleteClick(evt, canvas.id)}>x</div>
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
          <CanvasForm handleSave={handleSave} handleCancel={() => setBlockModalShow(false)}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}
const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Config);