import { delay } from 'msw'
import { HttpResponse } from 'msw/http'

// Fallas que se pueden activar desde la interfaz para probar cómo responde la app.
// Los handlers de MSW corren en la misma página, así que leen este estado directamente.
// Al recargar la página todo vuelve a "normal".

export const MODOS = [
  { valor: 'normal', etiqueta: 'Normal' },
  { valor: 'lenta', etiqueta: 'Respuesta lenta (4 s)' },
  { valor: 'transitoria', etiqueta: 'Falla transitoria (2 errores y luego responde)' },
  { valor: 'servidor', etiqueta: 'Error del servidor (500)' },
  { valor: 'red', etiqueta: 'Sin conexión' },
  { valor: 'invalida', etiqueta: 'Respuesta ilegible (no es JSON)' },
  { valor: 'incompleta', etiqueta: 'Respuesta incompleta (faltan campos)' },
]

const FALLAS_TRANSITORIAS = 2

const modos = { rest: 'normal', graphql: 'normal' }
const fallasPendientes = { rest: 0, graphql: 0 }

export const obtenerModo = (api) => modos[api]

export function cambiarModo(api, modo) {
  modos[api] = modo
  fallasPendientes[api] = modo === 'transitoria' ? FALLAS_TRANSITORIAS : 0
}

export const debeOmitirCampos = (api) => modos[api] === 'incompleta'

// Devuelve la respuesta de falla que corresponde al modo, o null si el handler debe responder normal.
export async function simularFalla(api) {
  switch (modos[api]) {
    case 'lenta':
      await delay(4000)
      return null
    case 'red':
      return HttpResponse.error()
    case 'servidor':
      return HttpResponse.json({ mensaje: 'Error interno simulado.' }, { status: 500 })
    case 'invalida':
      return new HttpResponse('<html><body>Servicio en mantención</body></html>', {
        headers: { 'Content-Type': 'text/html' },
      })
    case 'transitoria':
      if (fallasPendientes[api] > 0) {
        fallasPendientes[api] -= 1
        return HttpResponse.json({ mensaje: 'Servicio no disponible por un momento.' }, { status: 503 })
      }
      return null
    default:
      return null
  }
}