import { delay } from 'msw'
import { graphql } from 'msw/graphql'
import { HttpResponse } from 'msw/http'
import { ejecutarConsulta } from './esquema.js'

const LATENCIA_MS = 900

const api = graphql.link('/graphql')

export const graphqlHandlers = [
  // operation: atiende cualquier consulta enviada a /graphql y la ejecuta contra el esquema.
  api.operation(async ({ query, variables }) => {
    await delay(LATENCIA_MS)
    const resultado = await ejecutarConsulta(query, variables)
    return HttpResponse.json(resultado)
  }),
]