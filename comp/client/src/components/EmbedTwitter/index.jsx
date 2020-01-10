import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import './index.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const EmbedTwitter = () => {
  const [twitterhandle, setTwitterhandle] = useState('');
  const [screenName, setScreenName] = useState('');

  const getURLtoEmbed = (evt) => {
    evt.preventDefault();
    setScreenName(twitterhandle);
  }

  return (
    <>
      <div className="form-content">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter twitter handle</Form.Label>
            <Form.Control type="text" onChange={(evt) => setTwitterhandle(evt.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(evt) => getURLtoEmbed(evt)}>
            Submit
          </Button>
        </Form>
      </div>

      <div className="container-fluid">
        {
          screenName ?
            <TwitterTimelineEmbed
              key={screenName}
              sourceType="profile"
              screenName={screenName}
              options={{ height: 400 }}
            />
            : null
        }

      </div>
    </>
  );
}

export default EmbedTwitter;