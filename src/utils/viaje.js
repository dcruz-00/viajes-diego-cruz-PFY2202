import { diasEntre } from './formato.js'

export const nochesDelVuelo = (vuelo) => diasEntre(vuelo.fechaSalida, vuelo.fechaRegreso)

// Las fechas ISO (AAAA-MM-DD) se pueden comparar como texto.
export const hotelCubreVuelo = (hotel, vuelo) =>
  hotel.disponibleDesde <= vuelo.fechaSalida && vuelo.fechaRegreso <= hotel.disponibleHasta

// 'disponible' | 'agotado' | 'fuera-de-fechas' (solo si ya hay un vuelo elegido)
export function disponibilidadHotel(hotel, vuelo) {
  if (!hotel.disponible) {
    return 'agotado'
  }
  if (vuelo && !hotelCubreVuelo(hotel, vuelo)) {
    return 'fuera-de-fechas'
  }
  return 'disponible'
}