import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import GridLayout from 'react-grid-layout';
import { connect } from 'react-redux';
import { saveCanvas } from '../../action';
import WindowForm from '../Forms/WindowForm';
import {Link} from 'react-router-dom';
import './index.css';
import TextToHtml from '../TextToHtml/TextToHtml';

const Canvas = props => {
  const [blockModalShow, setBlockModalShow] = useState(false);
  const canvasId = props.match.params.id;
  const currentCanvas = props.canvasList.find(canvas => canvas.id === canvasId);
  const { windows, layout } = currentCanvas;

  const handleSave = (data) => {
    const {title, url} = data;
    const windowId = `${canvasId}window-${windows.length + 1}`
    const newWindow = {
      id: windowId,
      title,
      url,
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

  const renderWindow = (window) => {
    console.log(window);
    if (window.type === 'url') {
      return (
        <div className="custom-grid-item" key={window.id} data-grid={window.layout}>
          <iframe className="window-iframe" src={window.url} />
        </div>
      )
    }
    return(
      <div className="custom-grid-item" key={window.id} data-grid={window.layout}>
        <TextToHtml content={window.content}/>
      </div>
    )
  }

  return (
    <div className="container-fluid vh-100">
      <Link to={'/config'}><i className="fa fa-arrow-left"></i></Link>
      <div className="canvas-edit-header d-flex justify-content-between">
        <h2>{currentCanvas.title}</h2>
        <button className="btn btn-primary create-window" onClick={() => setBlockModalShow(true)}>Create</button>
      </div>
      <div className="canvas-container h-100">
        <GridLayout className="layout" cols={12} rowHeight={50} width={1200} isDraggable={true}>
          { windows.map( (window, index) => {
            return (
              renderWindow(window)
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