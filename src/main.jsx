


import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/styles/tailwind.css"
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Your main app component


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap your app in BrowserRouter to enable routing */}
  
      <App />
 
  </React.StrictMode>
);
