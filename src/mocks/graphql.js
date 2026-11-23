import { delay } from 'msw'
import { graphql } from 'msw/graphql'
import { HttpResponse } from 'msw/http'
import { ejecutarConsulta } from './esquema.js'
import { debeOmitirCampos, simularFalla } from './simulacion.js'

const LATENCIA_MS = 900

const api = graphql.link('/graphql')

export const graphqlHandlers = [
  // operation: atiende cualquier consulta enviada a /graphql y la ejecuta contra el esquema.
  api.operation(async ({ query, variables }) => {
    await delay(LATENCIA_MS)
    const falla = await simularFalla('graphql')
    if (falla) {
      return falla
    }

    const resultado = await ejecutarConsulta(query, variables)

    // Modo "incompleta": la respuesta llega sin la lista de hoteles.
    if (debeOmitirCampos('graphql') && resultado.data) {
      const { hoteles: _omitido, ...resto } = resultado.data
      return HttpResponse.json({ data: resto })
    }
    return HttpResponse.json(resultado)
  }),
]