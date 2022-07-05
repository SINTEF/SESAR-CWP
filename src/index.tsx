import 'maplibre-gl/dist/maplibre-gl.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './mqtt';
import './voice/voice';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Removed StrictMode to be able to make SectorConfigutations Draggable
// (will see if this causes problems) <React.StrictMode>
const root = ReactDOM.createRoot(document.querySelector('#root') ?? document.body);
root.render(
  <App />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
