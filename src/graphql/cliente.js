import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors'
import { RetryLink } from '@apollo/client/link/retry'

// Solo vale la pena reintentar si no hubo respuesta (red) o si el servidor falló (5xx).
// Un error de la consulta (CombinedGraphQLErrors) se repetiría igual.
function esReintentable(error) {
  if (CombinedGraphQLErrors.is(error)) {
    return false
  }
  if (ServerError.is(error)) {
    return error.statusCode >= 500
  }
  return error?.name === 'TypeError' // fetch sin respuesta
}

// 3 intentos en total con espera progresiva: 500 ms y luego 1 s.
const reintentos = new RetryLink({
  delay: { initial: 500, max: 2000, jitter: false },
  attempts: { max: 3, retryIf: esReintentable },
})

export const clienteGraphql = new ApolloClient({
  link: ApolloLink.from([reintentos, new HttpLink({ uri: '/graphql' })]),
  cache: new InMemoryCache(),
  defaultOptions: {
    // Muestra al instante lo que haya en caché y lo actualiza con el servidor:
    // los datos nunca quedan más viejos que la última visita a la página.
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
})