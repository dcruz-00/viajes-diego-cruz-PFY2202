import { delay } from 'msw'
import { http, HttpResponse } from 'msw/http'
import { destinos } from './datos.js'

const LATENCIA_MS = 700

// El listado entrega un resumen; el detalle agrega descripción, idioma y moneda.
const resumir = ({ id, nombre, pais, actividades }) => ({ id, nombre, pais, actividades })

export const restHandlers = [
  http.get('/api/destinos', async () => {
    await delay(LATENCIA_MS)
    return HttpResponse.json(destinos.map(resumir))
  }),

  http.get('/api/destinos/:id', async ({ params }) => {
    await delay(LATENCIA_MS)
    const destino = destinos.find((d) => d.id === params.id)

    if (!destino) {
      return HttpResponse.json({ mensaje: `No existe el destino "${params.id}".` }, { status: 404 })
    }
    return HttpResponse.json(destino)
  }),

  // Cualquier otra ruta de /api responde 404 en JSON, como lo haría un backend real.
  http.all('/api/*', () =>
    HttpResponse.json({ mensaje: 'El recurso solicitado no existe.' }, { status: 404 }),
  ),
]