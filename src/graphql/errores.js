import { CombinedGraphQLErrors, ServerError, ServerParseError } from '@apollo/client/errors'
import { ErrorApi } from '../api/errores.js'

// Convierte los errores de Apollo en ErrorApi para mostrarlos con los mismos componentes que REST.
export function traducirErrorGraphql(error) {
  if (CombinedGraphQLErrors.is(error)) {
    const [primero] = error.errors
    if (primero?.extensions?.code === 'NOT_FOUND') {
      return new ErrorApi(primero.message, { tipo: 'no-encontrado' })
    }
    return new ErrorApi(
      'El servidor no pudo resolver la consulta de vuelos y hoteles.',
      { tipo: 'consulta' },
    )
  }

  if (ServerParseError.is(error)) {
    return new ErrorApi(
      'El servidor envió una respuesta que no se pudo leer.',
      { tipo: 'respuesta-invalida', estado: error.statusCode },
    )
  }

  if (ServerError.is(error)) {
    return error.statusCode >= 500
      ? new ErrorApi('El servidor tuvo un problema y no pudo responder.', { tipo: 'servidor', estado: error.statusCode })
      : new ErrorApi(`El servidor rechazó la solicitud (código ${error.statusCode}).`, { tipo: 'solicitud', estado: error.statusCode })
  }

  return new ErrorApi(
    'No se pudo conectar con el servidor. Revisa tu conexión a internet.',
    { tipo: 'red' },
  )
}