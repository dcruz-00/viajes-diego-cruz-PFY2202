import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import SinApiSimulada from './pages/SinApiSimulada.jsx'

// BASE_URL es "/" en desarrollo y "/viajes-diego-cruz-PFY2202/" en producción.
// React Router espera el basename sin la barra final.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

// La API simulada se activa también en producción: el sitio publicado en GitHub Pages
// no tiene otro backend. El worker se busca dentro de BASE_URL para que funcione en el subdirectorio.
async function activarApiSimulada() {
  const { worker } = await import('./mocks/browser.js')
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledFrame: 'bypass',
    quiet: import.meta.env.PROD,
  })
}

const raiz = createRoot(document.getElementById('root'))

activarApiSimulada()
  .then(() => {
    raiz.render(
      <StrictMode>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
  })
  .catch((error) => {
    // Sin service worker no hay API: por ejemplo, en una ventana privada de Firefox.
    console.error(error)
    raiz.render(<SinApiSimulada />)
  })