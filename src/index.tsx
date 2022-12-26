import React from 'react';
import ReactDOM from 'react-dom/client';
import Connection from "./component/Connection";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './style/input.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cra from './component/Cra';
import Client from './component/client/Client';
import Event from './component/event/Event';
import Contrat from './component/contrat/Contrat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Cra />} />
          <Route path="client" element={<Client />} />
          <Route path="event" element={<Event/>} />
          <Route path="contrat" element={<Contrat />} />
          <Route path="connexion" element={<Connection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
