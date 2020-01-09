import React from 'react';
import './TextToHtml.css';

const TextToHtml = (props) => {
  const {header, title, body, footer} = props.content;
  return (
    <div className="text-center h-100 text-html">
      <div className="cover-containers h-100 d-flex w-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">{header}</h3>
          </div>
        </header>

        <main role="main" className="inner cover">
          <h1 className="cover-heading">{title}</h1>
          <p className="lead">{body}</p>
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner text-right">
            <p>{footer}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TextToHtml;
