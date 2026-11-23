import { gql } from '@apollo/client'

// Una sola petición trae los vuelos y los hoteles del destino, solo con los campos que usa la interfaz.
export const OPCIONES_VIAJE = gql`
  query OpcionesViaje($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      codigo
      origen
      fechaSalida
      fechaRegreso
      precio
      asientosDisponibles
      disponible
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      precioNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
      disponible
    }
  }
`