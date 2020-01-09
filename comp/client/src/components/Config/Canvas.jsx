import React, {useState} from "react";
import { connect } from 'react-redux';

const Canvas = props => {
  console.log(props);
  return (
    <div className="container-fluid canvas-container vh-100">
      Canvas
    </div>
  )
}

const mapStateToProps = (store) => ({
  canvasList: store.canvas.canvasList
});

export default connect(mapStateToProps)(Canvas);