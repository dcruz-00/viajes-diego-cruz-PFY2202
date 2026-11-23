import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { asegurarDatos, leerFoto, MAX_INTENTOS, recargarDatos, suscribir } from '../api/consultas.js'

/**
 * Conecta un componente con una consulta del almacén.
 * @param {string} clave Identifica la consulta (por ejemplo, "destino:cusco").
 * @param {(opciones: { signal: AbortSignal }) => Promise<any>} consultar Debe depender solo de la clave.
 */
export function useConsulta(clave, consultar) {
  // useSyncExternalStore vuelve a renderizar el componente cada vez que cambia la foto de la clave.
  const suscribirClave = useCallback((oyente) => suscribir(clave, oyente), [clave])
  const foto = useSyncExternalStore(suscribirClave, () => leerFoto(clave))

  // consultar cambia en cada render, pero para una misma clave hace lo mismo:
  // basta con ejecutar el efecto cuando cambia la clave.
  useEffect(() => {
    asegurarDatos(clave, consultar)
  }, [clave])

  return {
    datos: foto.datos,
    error: foto.estado === 'error' ? foto.error : null,
    cargando: foto.estado === 'cargando' || foto.estado === 'inactiva',
    intento: foto.intento,
    maxIntentos: MAX_INTENTOS,
    recargar: () => recargarDatos(clave, consultar),
  }
}