import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

export default function WindowForm(props) {
  const [widgetHtml, setWidgetHtml] = useState('');

  const [coverHeader, setCoverHeader] = useState('');
  const [coverTitle, setCoverTitle] = useState('');
  const [coverBody, setCoverBody] = useState('');
  const [coverFooter, setCoverFooter] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const [url, setUrl] = useState('');
  const options = [
    {
      label: 'Url',
      value: 'url'
    },
    {
      label: 'Coverpage',
      value: 'coverpage'
    },
    {
      label: 'Widget',
      value: 'widget'
    }
  ]

  const handleClick = evt => {
    evt.preventDefault();
    let formData;
    if (selectedType.value === 'url') {
      formData = {
        type: selectedType.value,
        content: {
          url
        }
      }
    } else if (selectedType.value === 'coverpage') {
      formData = {
        type: selectedType.value,
        content: {
          title: coverTitle,
          header: coverHeader,
          body: coverBody,
          footer: coverFooter
        }
      }
    } else if (selectedType.value === 'widget') {
      formData = {
        type: selectedType.value,
        content: {
          widgetHtml
        }
      }
    }
    console.log(formData);
    props.handleSave(formData);
  };

  const renderForm = () => {
    if (selectedType.value === 'url') {
      return (
        <div className="col-12">
          <Form.Group>
            <Form.Label>Window Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter url"
              value={url}
              onChange={evt => setUrl(evt.target.value)}
            />
          </Form.Group>
        </div>
      )
    }
    if (selectedType.value === 'widget') {
      return(
        <div className="col-12">
          <Form.Group>
            <Form.Label>Enter widget</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter widget"
              value={widgetHtml}
              onChange={evt => setWidgetHtml(evt.target.value)}
            />
          </Form.Group>
        </div>
      )
    }
    if (selectedType.value === 'coverpage') {
      return (
        <>
        <div className="col-12">
          <Form.Group>
            <Form.Label>Coverpage Header</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coverpage header"
              value={coverHeader}
              onChange={evt => setCoverHeader(evt.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-12">
          <Form.Group>
            <Form.Label>Coverpage Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coverpage title"
              value={coverTitle}
              onChange={evt => setCoverTitle(evt.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-12">
          <Form.Group>
            <Form.Label>Coverpage Body</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter coverpage body"
              value={coverBody}
              onChange={evt => setCoverBody(evt.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-12">
          <Form.Group>
            <Form.Label>Coverpage Footer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter footer text"
              value={coverFooter}
              onChange={evt => setCoverFooter(evt.target.value)}
            />
          </Form.Group>
        </div>
        </>
      )
    }
  }
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mb-3">
          <Form.Label>Type</Form.Label>
          <Select
            options={options}
            value={selectedType}
            onChange={(option) => {setSelectedType(option)}}
          />
        </div>
        {selectedType && renderForm()}
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
