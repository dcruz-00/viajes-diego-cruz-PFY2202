import { NavLink, Outlet } from 'react-router'
import PanelFallas from '../components/PanelFallas.jsx'

const claseEnlace = ({ isActive }) =>
  `rounded px-3 py-2 font-semibold ${isActive ? 'bg-primario text-white' : 'text-primario hover:bg-borde'}`

function LayoutPrincipal() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primario text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-4">
          <p className="text-2xl font-bold">Rumbo Viajes</p>
          <p className="opacity-85">Destinos, vuelos y hoteles en un solo lugar</p>
        </div>
      </header>

      <nav aria-label="Principal" className="border-b border-borde bg-superficie">
        <ul className="mx-auto flex max-w-6xl gap-2 px-4 py-2">
          <li><NavLink to="/" end className={claseEnlace}>Inicio</NavLink></li>
          <li><NavLink to="/destinos" className={claseEnlace}>Destinos</NavLink></li>
        </ul>
      </nav>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>

        <footer className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-4 text-sm text-texto-suave">
          <PanelFallas />
          <p>Proyecto académico PFY2202 · Datos simulados</p>
        </div>
      </footer>
    </div>
  )
}

export default LayoutPrincipal