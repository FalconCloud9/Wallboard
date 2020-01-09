import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import GridLayout from 'react-grid-layout';
import { connect } from 'react-redux';
import { saveCanvas } from '../../action';
import WindowForm from '../Forms/WindowForm';
import {Link} from 'react-router-dom';
import './index.css';

const Canvas = props => {
  const [blockModalShow, setBlockModalShow] = useState(false);
  const canvasId = props.match.params.id;
  const currentCanvas = props.canvasList.find(canvas => canvas.id === canvasId);
  const { windows, layout, single } = currentCanvas;

  const handleSave = (data) => {
    const {title, content, type} = data;
    const windowId = `${canvasId}window-${windows.length + 1}`
    const newWindow = {
      id: windowId,
      title,
      content,
      type,
      layout: {i: windowId, x: 0, y: 0, w: 2, h: 2}
    };
    const updatedCanvas = props.canvasList.map( canvas => {
      if (canvas.id === canvasId) {
        canvas.windows.push(newWindow);
      }
      return canvas;
    });
    props.dispatch(saveCanvas(updatedCanvas));
    setBlockModalShow(false);
  }

  const renderLayout = () => {
    return single ? <div className="h-100 w-100">
      {windows.length && windows[0].title}
    </div> :
    <GridLayout className="layout" cols={12} rowHeight={50} width={window.innerWidth - 30} isDraggable={true} containerPadding={[15, 15]}>
    { windows.map( (window) => {
      return (
        <div className="custom-grid-item" key={window.id} data-grid={window.layout}>
          <iframe className="window-iframe" src={window.content.url} />
        </div>
      )
    })}
  </GridLayout>
  }

  return (
    <div className="container-fluid vh-100">
      <Link to={'/config'}><i className="fa fa-arrow-left"></i></Link>
      <div className="canvas-edit-header d-flex justify-content-between">
        <h2>{currentCanvas.title}</h2>
      </div>
      <button className="btn btn-primary create-window" onClick={() => setBlockModalShow(true)}>Create</button>
      <div className="canvas-container h-100">
        {renderLayout()}
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
          <WindowForm handleSave={handleSave}/>
        </Modal.Body>
      </Modal>
    </div>
  )
}

const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Canvas);