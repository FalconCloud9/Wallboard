import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function CanvasForm(props) {
  const [title, setTitle] = useState("");
  const [singleWindow, setSingleWindow] = useState(true);

  const handleClick = evt => {
    evt.preventDefault();
    if (title.length) {
      props.handleSave({title, singleWindow});
    }
  };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={evt => setTitle(evt.target.value)}
            />
          </Form.Group>
          <Form.Label>Number of Windows</Form.Label>
          <Form.Group>
            <Form.Check inline checked={singleWindow} label="Single" type="radio" id={`inline-radio-1`} name="window-select" onChange={() => setSingleWindow(true)} />
            <Form.Check inline checked={!singleWindow} label="Multiple" type="radio" id={`inline-radio-2`} name="window-select" onChange={() => setSingleWindow(false)} />
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClick}
          >
            Save
          </button>
          <button type="button" className="btn btn-primary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
