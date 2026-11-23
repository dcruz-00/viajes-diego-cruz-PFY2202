import { useState } from 'react'
import { obtenerDestinos } from '../api/destinos.js'
import AvisoCarga from '../components/AvisoCarga.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'
import { EsqueletoTarjetas } from '../components/Esqueleto.jsx'
import MensajeError from '../components/MensajeError.jsx'
import TarjetaDestino from '../components/TarjetaDestino.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
import { normalizar, pluralizar } from '../utils/formato.js'

function coincide(destino, busqueda) {
  const texto = normalizar([destino.nombre, destino.pais, ...destino.actividades].join(' '))
  return texto.includes(normalizar(busqueda.trim()))
}

function ListadoDestinos() {
  const [busqueda, setBusqueda] = useState('')
  const { datos: destinos, error, cargando, intento, maxIntentos, recargar } =
    useConsulta('destinos', obtenerDestinos)

  const visibles = destinos?.filter((destino) => coincide(destino, busqueda)) ?? []

  return (
    <section aria-labelledby="titulo-destinos" aria-busy={cargando}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="titulo-destinos" className="text-2xl font-bold">Destinos</h1>
          <p className="text-texto-suave">Elige un destino para ver sus vuelos y hoteles.</p>
        </div>

        <label className="flex w-full flex-col gap-1 text-sm font-semibold sm:w-72">
          Buscar por ciudad, país o actividad
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Ej.: playa, Perú, museo"
            className="rounded border border-borde bg-superficie px-3 py-2 font-normal"
          />
        </label>
      </div>

      {cargando && !destinos && (
        <>
          <AvisoCarga mensaje="Cargando destinos…" intento={intento} maxIntentos={maxIntentos} />
          <EsqueletoTarjetas />
        </>
      )}

      {error && (
        <MensajeError
          error={error}
          intentos={intento}
          onReintentar={recargar}
          alternativa={{ to: '/', texto: 'Volver al inicio' }}
        />
      )}

      {destinos && !error && (
        <>
          <p role="status" className="mb-3 text-sm text-texto-suave">
            {busqueda.trim()
              ? `${pluralizar(visibles.length, 'destino coincide', 'destinos coinciden')} con la búsqueda`
              : pluralizar(destinos.length, 'destino disponible', 'destinos disponibles')}
          </p>

          {visibles.length === 0 ? (
            <EstadoVacio mensaje={`No hay destinos que coincidan con «${busqueda.trim()}».`}>
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="font-semibold text-primario underline"
              >
                Limpiar búsqueda
              </button>
            </EstadoVacio>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((destino) => (
                <TarjetaDestino key={destino.id} destino={destino} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default ListadoDestinos