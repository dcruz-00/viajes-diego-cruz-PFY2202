import { formatearFecha, formatearPrecio, pluralizar } from '../utils/formato.js'
import { nochesDelVuelo } from '../utils/viaje.js'
import BotonElegir from './BotonElegir.jsx'
import EstadoVacio from './EstadoVacio.jsx'

function ListaVuelos({ vuelos, seleccionadoId, onElegir }) {
  const hayDisponibles = vuelos.some((vuelo) => vuelo.disponible)

  return (
    <section aria-labelledby="titulo-vuelos">
      <h3 id="titulo-vuelos" className="mb-3 text-xl font-bold">Vuelos desde Santiago</h3>

      {vuelos.length === 0 && <EstadoVacio mensaje="No hay vuelos programados para este destino." />}

      {vuelos.length > 0 && !hayDisponibles && (
        <p className="mb-3 rounded border border-acento/40 bg-acento/10 px-3 py-2 text-sm">
          Todos los vuelos a este destino están agotados. Aún puedes revisar los hoteles.
        </p>
      )}

      <ul className="space-y-3">
        {vuelos.map((vuelo) => {
          const seleccionado = vuelo.id === seleccionadoId
          return (
            <li
              key={vuelo.id}
              className={`rounded-lg border bg-superficie p-4 ${seleccionado ? 'border-primario ring-2 ring-primario/30' : 'border-borde'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{vuelo.aerolinea} · {vuelo.codigo}</p>
                  <p className="text-sm text-texto-suave">
                    {formatearFecha(vuelo.fechaSalida)} → {formatearFecha(vuelo.fechaRegreso)}
                    {' · '}{pluralizar(nochesDelVuelo(vuelo), 'noche', 'noches')}
                  </p>
                  <p className="text-sm">
                    {vuelo.disponible
                      ? pluralizar(vuelo.asientosDisponibles, 'asiento disponible', 'asientos disponibles')
                      : <span className="font-semibold text-error">Agotado</span>}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold">{formatearPrecio(vuelo.precio)}</p>
                  <p className="text-xs text-texto-suave">ida y vuelta, por pasajero</p>
                </div>
              </div>
              <BotonElegir
                seleccionado={seleccionado}
                disabled={!vuelo.disponible}
                onClick={() => onElegir(vuelo)}
                descripcion={`vuelo ${vuelo.codigo}`}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ListaVuelos