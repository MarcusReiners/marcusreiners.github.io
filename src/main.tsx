import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './Portfolio'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/marcusreiners.github.io/">
      <Routes>
        <Route path="*" element={<Portfolio />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
