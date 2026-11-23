import { formatearFecha, formatearPrecio, pluralizar } from '../utils/formato.js'
import { disponibilidadHotel } from '../utils/viaje.js'
import BotonElegir from './BotonElegir.jsx'
import EstadoVacio from './EstadoVacio.jsx'

function Estrellas({ cantidad }) {
  return (
    <span role="img" aria-label={pluralizar(cantidad, 'estrella', 'estrellas')} className="text-acento">
      {'★'.repeat(cantidad)}
    </span>
  )
}

function ListaHoteles({ hoteles, vuelo, seleccionadoId, onElegir }) {
  return (
    <section aria-labelledby="titulo-hoteles">
      <h3 id="titulo-hoteles" className="mb-3 text-xl font-bold">Hoteles</h3>

      {hoteles.length === 0 && <EstadoVacio mensaje="Todavía no tenemos hoteles en este destino." />}

      <ul className="space-y-3">
        {hoteles.map((hotel) => {
          const seleccionado = hotel.id === seleccionadoId
          const disponibilidad = disponibilidadHotel(hotel, vuelo)
          return (
            <li
              key={hotel.id}
              className={`rounded-lg border bg-superficie p-4 ${seleccionado ? 'border-primario ring-2 ring-primario/30' : 'border-borde'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{hotel.nombre} <Estrellas cantidad={hotel.estrellas} /></p>
                  <p className="text-sm text-texto-suave">
                    Habitaciones del {formatearFecha(hotel.disponibleDesde)} al {formatearFecha(hotel.disponibleHasta)}
                  </p>
                  <p className="text-sm">
                    {disponibilidad === 'agotado' && <span className="font-semibold text-error">Sin habitaciones</span>}
                    {disponibilidad === 'fuera-de-fechas' && (
                      <span className="font-semibold text-acento">No disponible en las fechas de tu vuelo</span>
                    )}
                    {disponibilidad === 'disponible' &&
                      pluralizar(hotel.habitacionesDisponibles, 'habitación disponible', 'habitaciones disponibles')}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold">{formatearPrecio(hotel.precioNoche)}</p>
                  <p className="text-xs text-texto-suave">por noche, habitación doble</p>
                </div>
              </div>
              <BotonElegir
                seleccionado={seleccionado}
                disabled={disponibilidad !== 'disponible'}
                onClick={() => onElegir(hotel)}
                descripcion={`hotel ${hotel.nombre}`}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ListaHoteles