import { Link, useParams } from 'react-router'
import { obtenerDestino } from '../api/destinos.js'
import Actividades from '../components/Actividades.jsx'
import AvisoCarga from '../components/AvisoCarga.jsx'
import { EsqueletoEncabezado } from '../components/Esqueleto.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useConsulta } from '../hooks/useConsulta.js'

function DetalleDestino() {
  const { id } = useParams()
  const { datos: destino, error, cargando, intento, maxIntentos, recargar } =
    useConsulta(`destino:${id}`, (opciones) => obtenerDestino(id, opciones))

  return (
    <article aria-busy={cargando}>
      <Link to="/destinos" className="mb-4 inline-block font-semibold text-primario underline">
        ← Todos los destinos
      </Link>

      {cargando && !destino && (
        <>
          <AvisoCarga mensaje="Cargando destino…" intento={intento} maxIntentos={maxIntentos} />
          <EsqueletoEncabezado />
        </>
      )}

      {error && (
        <MensajeError
          error={error}
          intentos={intento}
          onReintentar={recargar}
          alternativa={{ to: '/destinos', texto: 'Ver todos los destinos' }}
        />
      )}

      {destino && !error && (
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{destino.nombre}</h1>
          <p className="mb-3 text-lg text-texto-suave">{destino.pais}</p>
          <p className="mb-4 max-w-2xl">{destino.descripcion}</p>
          <dl className="mb-4 grid max-w-xl grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="font-semibold">Idioma</dt>
            <dd>{destino.idioma}</dd>
            <dt className="font-semibold">Moneda</dt>
            <dd>{destino.moneda}</dd>
          </dl>
          <h2 className="mb-2 font-semibold">Actividades populares</h2>
          <Actividades actividades={destino.actividades} />
        </header>
      )}
    </article>
  )
}

export default DetalleDestino