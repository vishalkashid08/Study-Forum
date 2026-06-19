import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Aos from 'aos'
import "aos/dist/aos.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

Aos.init({
  duration: 1200,
  easing: "ease-in-out",
  once: true,
  mirror: false
});

import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
