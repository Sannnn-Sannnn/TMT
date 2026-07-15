import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Dashboard from "@/pages/Dashboard.tsx";
import Playground from "@/pages/Playground.tsx";
import Login from "@/pages/Login.tsx";
import Landing from "@/pages/Landing.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Landing />} />
              <Route path={'/vite'} element={<App />} />
              <Route path={'login'} element={<Login />} />
              <Route path={'/playground'} element={<Playground />} />
              <Route path={'/dashboard'} element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
