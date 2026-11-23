// Error común a REST y GraphQL: la interfaz solo necesita saber qué pasó,
// si conviene reintentar y qué mensaje mostrar.
export class ErrorApi extends Error {
  constructor(mensaje, { tipo, estado = null }) {
    super(mensaje)
    this.name = 'ErrorApi'
    // 'red' | 'servidor' | 'no-encontrado' | 'solicitud' | 'respuesta-invalida' | 'respuesta-incompleta' | 'consulta'
    this.tipo = tipo
    this.estado = estado
    this.reintentable = tipo === 'red' || tipo === 'servidor'
  }
}

export const esCancelacion = (error) => error?.name === 'AbortError'