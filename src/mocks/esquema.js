import { buildSchema, graphql, GraphQLError } from 'graphql'
import { destinos, hoteles, vuelos } from './datos.js'

// Esquema real: el mock ejecuta cada consulta con la librería graphql,
// así que solo responde los campos que la consulta pide y valida tipos y argumentos.
const esquema = buildSchema(`
  type Vuelo {
    id: ID!
    aerolinea: String!
    codigo: String!
    origen: String!
    fechaSalida: String!
    fechaRegreso: String!
    precio: Int!
    asientosDisponibles: Int!
    disponible: Boolean!
  }

  type Hotel {
    id: ID!
    nombre: String!
    estrellas: Int!
    precioNoche: Int!
    disponibleDesde: String!
    disponibleHasta: String!
    habitacionesDisponibles: Int!
    disponible: Boolean!
  }

  type Query {
    vuelos(destinoId: ID!): [Vuelo!]!
    hoteles(destinoId: ID!): [Hotel!]!
  }
`)

function exigirDestino(destinoId) {
  if (!destinos.some((d) => d.id === destinoId)) {
    throw new GraphQLError(`No existe el destino "${destinoId}".`, {
      extensions: { code: 'NOT_FOUND' },
    })
  }
}

// rootValue: una función por cada campo de Query. Reciben los argumentos de la consulta.
const resolvers = {
  vuelos: ({ destinoId }) => {
    exigirDestino(destinoId)
    return vuelos
      .filter((v) => v.destinoId === destinoId)
      .map((v) => ({ ...v, disponible: v.asientosDisponibles > 0 }))
  },
  hoteles: ({ destinoId }) => {
    exigirDestino(destinoId)
    return hoteles
      .filter((h) => h.destinoId === destinoId)
      .map((h) => ({ ...h, disponible: h.habitacionesDisponibles > 0 }))
  },
}

export function ejecutarConsulta(query, variables) {
  return graphql({ schema: esquema, source: query, rootValue: resolvers, variableValues: variables })
}