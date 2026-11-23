import { formatearPrecio, pluralizar } from '../utils/formato.js'
import { nochesDelVuelo } from '../utils/viaje.js'

function Fila({ etiqueta, children }) {
  return (
    <div className="border-b border-borde py-3">
      <dt className="text-sm font-semibold text-texto-suave">{etiqueta}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}

function ResumenViaje({ vuelo, hotel, onQuitarVuelo, onQuitarHotel }) {
  const noches = vuelo ? nochesDelVuelo(vuelo) : 0
  const totalHotel = vuelo && hotel ? noches * hotel.precioNoche : 0
  const total = vuelo ? vuelo.precio + totalHotel : null

  const botonQuitar = (onClick, descripcion) => (
    <button type="button" onClick={onClick} className="text-sm font-semibold text-primario underline">
      Quitar<span className="sr-only"> {descripcion}</span>
    </button>
  )

  return (
    <aside
      aria-labelledby="titulo-resumen"
      className="h-fit rounded-lg border border-borde bg-superficie p-4 shadow-sm lg:sticky lg:top-4"
    >
      <h3 id="titulo-resumen" className="text-xl font-bold">Tu viaje</h3>

      <dl>
        <Fila etiqueta="Vuelo">
          {vuelo ? (
            <div className="flex items-start justify-between gap-2">
              <span>{vuelo.codigo} · {formatearPrecio(vuelo.precio)}</span>
              {botonQuitar(onQuitarVuelo, 'vuelo')}
            </div>
          ) : (
            <span className="text-texto-suave">Elige un vuelo</span>
          )}
        </Fila>

        <Fila etiqueta="Hotel">
          {hotel ? (
            <div className="flex items-start justify-between gap-2">
              <span>
                {hotel.nombre}
                {vuelo && (
                  <span className="block text-sm text-texto-suave">
                    {pluralizar(noches, 'noche', 'noches')} × {formatearPrecio(hotel.precioNoche)}
                  </span>
                )}
              </span>
              {botonQuitar(onQuitarHotel, 'hotel')}
            </div>
          ) : (
            <span className="text-texto-suave">Opcional</span>
          )}
        </Fila>
      </dl>

      {/* aria-live: el lector de pantalla anuncia el total cada vez que cambia. */}
      <div aria-live="polite" className="pt-3">
        {total === null ? (
          <p className="text-sm text-texto-suave">Elige un vuelo para calcular el total del viaje.</p>
        ) : (
          <p className="flex items-baseline justify-between text-lg">
            <span className="font-semibold">Total estimado</span>
            <span className="font-bold">{formatearPrecio(total)}</span>
          </p>
        )}
      </div>
      <p className="mt-2 text-xs text-texto-suave">Valores referenciales para 1 pasajero.</p>
    </aside>
  )
}

export default ResumenViaje