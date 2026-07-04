import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'
import "./styles/variables.css";
import "./styles/common.css";
import "./styles/card.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
        position="top-right"
        toastOptions={{
            duration: 3000
        }}
    />
  </StrictMode>,
)
