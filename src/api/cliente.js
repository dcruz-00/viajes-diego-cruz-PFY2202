import { ErrorApi, esCancelacion } from './errores.js'

async function leerMensajeDelServidor(respuesta) {
  try {
    const cuerpo = await respuesta.json()
    return typeof cuerpo?.mensaje === 'string' ? cuerpo.mensaje : null
  } catch {
    return null
  }
}

async function crearErrorHttp(respuesta) {
  const { status } = respuesta

  if (status === 404) {
    const mensaje = await leerMensajeDelServidor(respuesta)
    return new ErrorApi(mensaje ?? 'El recurso solicitado no existe.', { tipo: 'no-encontrado', estado: status })
  }

  if (status >= 500) {
    return new ErrorApi(
      'El servidor tuvo un problema y no pudo responder.',
      { tipo: 'servidor', estado: status },
    )
  }

  return new ErrorApi(
    `El servidor rechazó la solicitud (código ${status}).`,
    { tipo: 'solicitud', estado: status },
  )
}

// GET que devuelve el JSON como objeto o lanza un ErrorApi. Las cancelaciones se relanzan tal cual.
export async function obtenerJSON(url, { signal } = {}) {
  let respuesta

  try {
    respuesta = await fetch(url, { signal })
  } catch (error) {
    if (esCancelacion(error)) {
      throw error
    }
    throw new ErrorApi(
      'No se pudo conectar con el servidor. Revisa tu conexión a internet.',
      { tipo: 'red' },
    )
  }

  if (!respuesta.ok) {
    throw await crearErrorHttp(respuesta)
  }

  try {
    return await respuesta.json()
  } catch (error) {
    if (esCancelacion(error)) {
      throw error
    }
    throw new ErrorApi(
      'El servidor envió una respuesta que no se pudo leer.',
      { tipo: 'respuesta-invalida', estado: respuesta.status },
    )
  }
}