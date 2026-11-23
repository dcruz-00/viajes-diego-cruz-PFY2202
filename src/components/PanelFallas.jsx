import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { invalidarConsultas } from '../api/consultas.js'
import { cambiarModo, MODOS, obtenerModo } from '../mocks/simulacion.js'

const APIS = [
  { id: 'rest', etiqueta: 'API REST (destinos)' },
  { id: 'graphql', etiqueta: 'API GraphQL (vuelos y hoteles)' },
]

// Herramienta de pruebas: activa fallas en la API simulada y vuelve a consultar lo que está en pantalla.
function PanelFallas() {
  const clienteGraphql = useApolloClient()
  const [modos, setModos] = useState(() => ({ rest: obtenerModo('rest'), graphql: obtenerModo('graphql') }))
  const activa = Object.values(modos).some((modo) => modo !== 'normal')

  function cambiar(api, modo) {
    cambiarModo(api, modo)
    setModos((anteriores) => ({ ...anteriores, [api]: modo }))

    if (api === 'rest') {
      invalidarConsultas()
    } else {
      // Si la consulta vuelve a fallar, el error ya se muestra en la página.
      clienteGraphql.refetchObservableQueries().catch(() => {})
    }
  }

  return (
    <details className="rounded-lg border border-borde bg-fondo p-3">
      <summary className="cursor-pointer font-semibold text-texto">
        Simular fallas de la API {activa && <span className="ml-2 rounded bg-acento px-2 py-0.5 text-xs text-white">activa</span>}
      </summary>
      <p className="mt-2 text-sm">
        Al cambiar una opción se vuelven a consultar los datos en pantalla. Al recargar la página todo vuelve a «Normal».
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {APIS.map((api) => (
          <label key={api.id} className="flex flex-col gap-1 text-sm font-semibold text-texto">
            {api.etiqueta}
            <select
              value={modos[api.id]}
              onChange={(evento) => cambiar(api.id, evento.target.value)}
              className="rounded border border-borde bg-superficie px-2 py-2 font-normal"
            >
              {MODOS.map((modo) => (
                <option key={modo.valor} value={modo.valor}>{modo.etiqueta}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </details>
  )
}

export default PanelFallas