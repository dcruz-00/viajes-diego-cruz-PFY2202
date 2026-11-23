import { ErrorApi } from './errores.js'

// Un JSON válido no garantiza que traiga lo que la interfaz necesita.
// Estas funciones revisan la estructura antes de entregar los datos a los componentes.

export const esTexto = (valor) => typeof valor === 'string' && valor.trim() !== ''
export const esEntero = (valor) => Number.isInteger(valor) && valor >= 0
export const esFecha = (valor) => typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor)
export const esListaDeTextos = (valor) => Array.isArray(valor) && valor.every(esTexto)

// Lanza un error si la condición no se cumple. "recurso" se usa en el mensaje.
export function exigir(condicion, recurso) {
  if (!condicion) {
    throw new ErrorApi(
      `La información de ${recurso} llegó incompleta, por lo que no se puede mostrar.`,
      { tipo: 'respuesta-incompleta' },
    )
  }
}

export function exigirLista(valor, esValido, recurso) {
  exigir(Array.isArray(valor) && valor.every(esValido), recurso)
  return valor
}