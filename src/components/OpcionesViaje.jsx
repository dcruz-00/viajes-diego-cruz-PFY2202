import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { OPCIONES_VIAJE } from '../graphql/consultas.js'
import { traducirErrorGraphql } from '../graphql/errores.js'
import { leerOpcionesViaje } from '../graphql/validacion.js'
import { hotelCubreVuelo } from '../utils/viaje.js'
import AvisoCarga from './AvisoCarga.jsx'
import { EsqueletoFilas } from './Esqueleto.jsx'
import ListaHoteles from './ListaHoteles.jsx'
import ListaVuelos from './ListaVuelos.jsx'
import MensajeError from './MensajeError.jsx'
import ResumenViaje from './ResumenViaje.jsx'

// Revisa el resultado de useQuery y devuelve opciones válidas o un ErrorApi.
function interpretar({ data, loading, error }) {
  if (error) {
    return { problema: traducirErrorGraphql(error) }
  }
  if (data === undefined && loading) {
    return {}
  }
  try {
    return { opciones: leerOpcionesViaje(data) }
  } catch (problema) {
    return { problema }
  }
}

function OpcionesViaje({ destinoId }) {
  const [vueloId, setVueloId] = useState(null)
  const [hotelId, setHotelId] = useState(null)
  const consulta = useQuery(OPCIONES_VIAJE, { variables: { destinoId } })
  const { opciones, problema } = interpretar(consulta)

  const vuelo = opciones?.vuelos.find((v) => v.id === vueloId) ?? null
  const hotel = opciones?.hoteles.find((h) => h.id === hotelId) ?? null

  function elegirVuelo(nuevo) {
    if (nuevo.id === vueloId) {
      setVueloId(null)
      return
    }
    setVueloId(nuevo.id)
    // Un hotel que no cubre las fechas del nuevo vuelo deja de servir.
    if (hotel && !hotelCubreVuelo(hotel, nuevo)) {
      setHotelId(null)
    }
  }

  const elegirHotel = (nuevo) => setHotelId(nuevo.id === hotelId ? null : nuevo.id)

  // refetch rechaza la promesa si vuelve a fallar; el error ya se muestra con consulta.error.
  const reintentar = () => consulta.refetch().catch(() => {})

  return (
    <section aria-labelledby="titulo-opciones" aria-busy={consulta.loading} className="mt-8">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="titulo-opciones" className="text-2xl font-bold">Vuelos y hoteles</h2>
        {consulta.loading && opciones && (
          <p role="status" className="text-sm text-texto-suave">Actualizando disponibilidad…</p>
        )}
      </div>

      {!opciones && !problema && (
        <>
          <AvisoCarga mensaje="Buscando vuelos y hoteles…" />
          <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
            <EsqueletoFilas />
            <EsqueletoFilas cantidad={1} />
          </div>
        </>
      )}

      {problema && (
        <MensajeError
          error={problema}
          onReintentar={reintentar}
          alternativa={{ to: '/destinos', texto: 'Elegir otro destino' }}
        />
      )}

      {opciones && !problema && (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 space-y-8">
            <ListaVuelos vuelos={opciones.vuelos} seleccionadoId={vueloId} onElegir={elegirVuelo} />
            <ListaHoteles hoteles={opciones.hoteles} vuelo={vuelo} seleccionadoId={hotelId} onElegir={elegirHotel} />
          </div>
          <ResumenViaje
            vuelo={vuelo}
            hotel={hotel}
            onQuitarVuelo={() => setVueloId(null)}
            onQuitarHotel={() => setHotelId(null)}
          />
        </div>
      )}
    </section>
  )
}

export default OpcionesViaje