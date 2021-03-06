import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GridLayout from "react-grid-layout";
import { connect } from "react-redux";
import { saveCanvas } from "../../action";
import WindowForm from "../Forms/WindowForm";
import { Link } from "react-router-dom";
import "./index.css";
import { createMarkup } from "../../utils";
import TextToHtml from "../TextToHtml/TextToHtml";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Canvas = props => {
  const [blockModalShow, setBlockModalShow] = useState(false);
  const canvasId = props.match.params.id;
  const currentCanvas = props.canvasList.find(canvas => canvas.id === canvasId);
  const { windows, single } = currentCanvas;

  const handleSave = data => {
    const { title, content, type } = data;
    const windowId = `${canvasId}window-${windows.length + 1}`;
    const newWindow = {
      id: windowId,
      title,
      content,
      type,
      layout: { i: windowId, x: 0, y: 0, w: 4, h: 6 }
    };
    const updatedCanvas = props.canvasList.map(canvas => {
      if (canvas.id === canvasId) {
        canvas.windows.push(newWindow);
      }
      return canvas;
    });
    props.dispatch(saveCanvas(updatedCanvas));
    setBlockModalShow(false);
  };

  const handleLayoutChange = layout => {
    const updatedWindows = windows.map((window, index) => {
      window.layout = layout[index];
      return window;
    });
    const updatedCanvas = props.canvasList.map(canvas => {
      if (canvas.id === canvasId) {
        canvas.windows = updatedWindows;
      }
      return canvas;
    });
    props.dispatch(saveCanvas(updatedCanvas));
  };

  const renderLayout = () => {
    return single ? (
      <div className="h-100 w-100">
        <div className="h-100 w-100" key={window.id} data-grid={window.layout}>
          {renderWindow(windows[0])}
        </div>
      </div>
    ) : (
      <GridLayout
        className="layout"
        cols={12}
        rowHeight={50}
        width={window.innerWidth - 30}
        isDraggable={true}
        containerPadding={[15, 15]}
        onLayoutChange={handleLayoutChange}
      >
        {windows.map(window => {
          return (
            <div
              className="custom-grid-item"
              key={window.id}
              data-grid={window.layout}
            >
              {renderWindow(window)}
            </div>
          );
        })}
      </GridLayout>
    );
  };

  const renderWindow = window => {
    if (window.type === "url") {
      return <iframe className="window-iframe" src={window.content.url} />;
    }
    if (window.type === "coverpage") {
      return <TextToHtml content={window.content} />;
    }
    if (window.type === "widget") {
      const widgetHtml = window.content.widgetHtml;
      return (
        <div
          className="widget-container"
          dangerouslySetInnerHTML={createMarkup(widgetHtml)}
        ></div>
      );
    }
    if (window.type === "twitter") {
      const twitterHandle = window.content.twitterHandle;
      return (
        <TwitterTimelineEmbed
          key={`${window.id}-${twitterHandle}`}
          sourceType="profile"
          screenName={twitterHandle}
        />
      )
    }
  };

  return (
    <div className="container-fluid vh-100 pt-2 edit-config">
      <div className="row">
        <header className="col-12 text-center">
          <div className="float-left">
            <Link to={"/config"}>
              <i className="fa fa-arrow-left fa-lg"></i>
            </Link>
          </div>  
          <h2>{currentCanvas.title}</h2>
          <div className="float-right">
            { (!single || windows.length === 0) ? <button
              className="btn btn-primary create-window"
              onClick={() => setBlockModalShow(true)}
            >
              Create Window
            </button> : null }
            {
              single && windows.length ? <button
              className="btn btn-primary create-window"
              onClick={() => setBlockModalShow(true)}
              >
                Edit Window
              </button> : null
            }
          </div>
        </header>
      </div>
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
          <WindowForm handleSave={handleSave} currentWindow={windows[0]} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = store => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Canvas);
