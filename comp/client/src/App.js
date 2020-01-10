import React from 'react';
import Routes from './components/routes';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./wsEventListener";
import { WsEventListener } from './wsEventListener';

const ws = new WsEventListener("ws://localhost:4005")
ws.setDepartment("engineering");
ws.setUpListener();

function App() {
  return (
    <Routes />
  );
}

export default App;
