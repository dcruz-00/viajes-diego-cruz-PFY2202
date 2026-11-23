import { obtenerJSON } from './cliente.js'
import { esListaDeTextos, esTexto, exigir, exigirLista } from './validacion.js'

const esResumenDestino = (d) =>
  esTexto(d?.id) && esTexto(d.nombre) && esTexto(d.pais) && esListaDeTextos(d.actividades)

const esDetalleDestino = (d) =>
  esResumenDestino(d) && esTexto(d.descripcion) && esTexto(d.idioma) && esTexto(d.moneda)

export async function obtenerDestinos({ signal }) {
  const datos = await obtenerJSON('/api/destinos', { signal })
  return exigirLista(datos, esResumenDestino, 'los destinos')
}

export async function obtenerDestino(id, { signal }) {
  const datos = await obtenerJSON(`/api/destinos/${encodeURIComponent(id)}`, { signal })
  exigir(esDetalleDestino(datos), 'este destino')
  return datos
}