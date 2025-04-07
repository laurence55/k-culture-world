import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add Roboto font
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
document.head.appendChild(link);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your index.html');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
