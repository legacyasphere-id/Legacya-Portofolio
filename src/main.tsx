import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade out the splash screen after first render
requestAnimationFrame(() => {
  const splash = document.getElementById('ls-splash')
  if (!splash) return
  splash.classList.add('hidden')
  setTimeout(() => splash.remove(), 520)
})
