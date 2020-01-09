import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function WindowForm(props) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleClick = evt => {
    evt.preventDefault();
    if (title.length && url.length) {
      props.handleSave({title, url});
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
        </div>
        <div className="col-12">
          <Form.Group>
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter url"
              value={url}
              onChange={evt => setUrl(evt.target.value)}
            />
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
