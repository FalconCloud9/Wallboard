import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import GridLayout from 'react-grid-layout';
import { connect } from 'react-redux';

const Canvas = props => {
  const [blockModalShow, setBlockModalShow] = useState(false);
  const canvasId = props.match.params.id;
  const currentCanvas = props.canvasList.find(canvas => canvas.id === canvasId);
  const { windows, layout } = currentCanvas;
  return (
    <>
      <div className="canvas-edit-header d-flex justify-content-between">
        <h2>{currentCanvas.title}</h2>
        <button className="btn btn-primary create-window">Create</button>
      </div>
      <div className="container-fluid canvas-container vh-100">
        <GridLayout className="layout" cols={12} rowHeight={100} width={1200} isDraggable={true}>
          { windows.map( (window, index) => {
            return (
              <div className="border" key={window.id} data-grid={layout[index]}>
                <div>{window.url}</div>
              </div>
            )
          })}
        </GridLayout>
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
          {/* <WindowForm handleSave={handleSave}/> */}
        </Modal.Body>
      </Modal>
    </>
  )
}

const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Canvas);