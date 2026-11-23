import { esEntero, esFecha, esTexto, exigir, exigirLista } from '../api/validacion.js'

const esVuelo = (v) =>
  esTexto(v?.id) && esTexto(v.aerolinea) && esTexto(v.codigo) && esTexto(v.origen) &&
  esFecha(v.fechaSalida) && esFecha(v.fechaRegreso) && esEntero(v.precio) &&
  esEntero(v.asientosDisponibles) && typeof v.disponible === 'boolean'

const esHotel = (h) =>
  esTexto(h?.id) && esTexto(h.nombre) && esEntero(h.estrellas) && esEntero(h.precioNoche) &&
  esFecha(h.disponibleDesde) && esFecha(h.disponibleHasta) &&
  esEntero(h.habitacionesDisponibles) && typeof h.disponible === 'boolean'

// Lanza ErrorApi 'respuesta-incompleta' si falta algo que la interfaz necesita.
export function leerOpcionesViaje(data) {
  exigir(data != null, 'vuelos y hoteles')
  return {
    vuelos: exigirLista(data.vuelos, esVuelo, 'los vuelos'),
    hoteles: exigirLista(data.hoteles, esHotel, 'los hoteles'),
  }
}