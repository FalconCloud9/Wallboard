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

  const handleLayoutChange = (layout) => {
    const updatedWindows = windows.map( (window, index) => {
      window.layout = layout[index];
      return window;
    });
    const updatedCanvas = props.canvasList.map ( canvas => {
      if (canvas.id === canvasId) {
        canvas.windows = updatedWindows;
      }
      return canvas;
    });
    props.dispatch(saveCanvas(updatedCanvas));    
  }

  const renderLayout = () => {
    return single ? <div className="h-100 w-100">
      <div className="h-100 w-100" key={window.id} data-grid={window.layout}>
        {renderWindow(windows[0])}
      </div>
    </div> :
    <GridLayout className="layout" cols={12} rowHeight={50} width={window.innerWidth - 30} isDraggable={true} containerPadding={[15, 15]} onLayoutChange={handleLayoutChange}>
    { windows.map( (window) => {
      return (
        <div className="custom-grid-item" key={window.id} data-grid={window.layout}>
          {renderWindow(window)}
        </div>
      )
    })}
  </GridLayout>
  }

  const renderWindow = (window) => {
    if (window.type === 'url') {
      return (
        <iframe className="window-iframe" src={window.content.url} />
      )
    }
    return(
        <TextToHtml content={window.content}/>
    )
  }

  return (
    <div className="container-fluid vh-100">
      <Link to={'/config'}><i className="fa fa-arrow-left"></i></Link>
      <div className="canvas-edit-header d-flex justify-content-between">
        <h2>{currentCanvas.title}</h2>
      </div>
      <button className="btn btn-primary create-window" onClick={() => setBlockModalShow(true)}>Create Window</button>
      <div className="canvas-container h-100">
        {windows.length ? renderLayout() : null}
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