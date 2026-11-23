import { Link } from 'react-router'
import Actividades from './Actividades.jsx'

function TarjetaDestino({ destino }) {
  return (
    <li className="relative flex flex-col rounded-lg border border-borde bg-superficie p-4 shadow-sm transition hover:border-primario hover:shadow focus-within:border-primario">
      <h2 className="text-xl font-bold">
        {/* El ::after del enlace cubre toda la tarjeta: se puede hacer clic en cualquier parte. */}
        <Link to={`/destinos/${destino.id}`} className="after:absolute after:inset-0 focus:outline-none">
          {destino.nombre}
        </Link>
      </h2>
      <p className="mb-3 text-texto-suave">{destino.pais}</p>
      <Actividades actividades={destino.actividades} />
      <p aria-hidden="true" className="mt-auto pt-4 font-semibold text-primario">Ver vuelos y hoteles →</p>
    </li>
  )
}

export default TarjetaDestino