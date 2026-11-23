// Almacén de consultas REST compartido por toda la app.
// - Deduplica: si una clave ya se está consultando, quien la pida se suma a esa misma petición.
// - Caché con vigencia (VIGENCIA_MS) y capacidad máxima (MAX_ENTRADAS).
// - Reintenta automáticamente los fallos transitorios con espera progresiva (500 ms, 1 s).
// - Cancela la petición cuando ningún componente la necesita.

import { esCancelacion } from './errores.js'

export const MAX_INTENTOS = 3
const ESPERA_BASE_MS = 500
const VIGENCIA_MS = 5 * 60 * 1000
const MAX_ENTRADAS = 20

// "foto": estado inmutable que leen los componentes. Se reemplaza (no se modifica) en cada cambio.
const INACTIVA = Object.freeze({ estado: 'inactiva', datos: null, error: null, intento: 0, actualizadoEn: 0 })

// clave → { foto, consultar, controlador, oyentes, liberacion }
const entradas = new Map()

function obtenerEntrada(clave) {
  let entrada = entradas.get(clave)
  if (!entrada) {
    entrada = { foto: INACTIVA, consultar: null, controlador: null, oyentes: new Set(), liberacion: null }
    entradas.set(clave, entrada)
    recortar()
  }
  return entrada
}

function actualizar(entrada, cambios) {
  entrada.foto = { ...entrada.foto, ...cambios }
  entrada.oyentes.forEach((oyente) => oyente())
}

// Si se supera la capacidad, elimina las entradas más antiguas que nadie está usando.
// Un Map recorre sus claves en orden de inserción, así que las primeras son las más antiguas.
function recortar() {
  for (const [clave, entrada] of entradas) {
    if (entradas.size <= MAX_ENTRADAS) {
      return
    }
    if (entrada.oyentes.size === 0 && !entrada.controlador) {
      entradas.delete(clave)
    }
  }
}

// Mueve la clave al final del Map: pasa a ser la más reciente.
function marcarComoReciente(clave, entrada) {
  entradas.delete(clave)
  entradas.set(clave, entrada)
}

function esperar(ms, signal) {
  return new Promise((resolver) => {
    const temporizador = setTimeout(resolver, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(temporizador)
      resolver()
    })
  })
}

async function ejecutar(clave, entrada) {
  const controlador = new AbortController()
  entrada.controlador = controlador

  for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
    // Los datos anteriores se conservan mientras se recarga.
    actualizar(entrada, { estado: 'cargando', intento, error: null })

    try {
      const datos = await entrada.consultar({ signal: controlador.signal })
      entrada.controlador = null
      marcarComoReciente(clave, entrada)
      actualizar(entrada, { estado: 'exito', datos, actualizadoEn: Date.now() })
      return
    } catch (error) {
      if (controlador.signal.aborted || esCancelacion(error)) {
        return
      }
      const quedanIntentos = intento < MAX_INTENTOS && error.reintentable
      if (!quedanIntentos) {
        entrada.controlador = null
        actualizar(entrada, { estado: 'error', error })
        return
      }
      await esperar(ESPERA_BASE_MS * 2 ** (intento - 1), controlador.signal)
      if (controlador.signal.aborted) {
        return
      }
    }
  }
}

// Nadie usa la clave: se cancela lo pendiente y solo se conservan datos exitosos.
function liberar(clave, entrada) {
  if (entrada.oyentes.size > 0) {
    return
  }
  if (entrada.controlador) {
    entrada.controlador.abort()
    entrada.controlador = null
  }
  if (entrada.foto.datos === null || entrada.foto.estado === 'error') {
    entradas.delete(clave)
  } else {
    entrada.foto = { ...entrada.foto, estado: 'exito', intento: 0 }
  }
}

export function leerFoto(clave) {
  return entradas.get(clave)?.foto ?? INACTIVA
}

export function suscribir(clave, oyente) {
  const entrada = obtenerEntrada(clave)
  clearTimeout(entrada.liberacion)
  entrada.oyentes.add(oyente)

  return () => {
    entrada.oyentes.delete(oyente)
    if (entrada.oyentes.size === 0) {
      // Se espera un instante: StrictMode desmonta y vuelve a montar enseguida,
      // y en ese caso la petición en curso se reutiliza en vez de cancelarse.
      entrada.liberacion = setTimeout(() => liberar(clave, entrada), 0)
    }
  }
}

// Consulta solo si hace falta: sin datos, o con datos vencidos. Un error no se repite solo.
export function asegurarDatos(clave, consultar) {
  const entrada = obtenerEntrada(clave)
  entrada.consultar = consultar
  const { estado, actualizadoEn } = entrada.foto

  if (estado === 'cargando' || estado === 'error') {
    return
  }
  if (estado === 'exito' && Date.now() - actualizadoEn < VIGENCIA_MS) {
    return
  }
  ejecutar(clave, entrada)
}

// Fuerza una nueva consulta (botón Reintentar o Actualizar).
export function recargarDatos(clave, consultar) {
  const entrada = obtenerEntrada(clave)
  entrada.consultar = consultar
  if (entrada.foto.estado !== 'cargando') {
    ejecutar(clave, entrada)
  }
}

// Descarta la caché: lo que está en pantalla se vuelve a consultar y el resto se borra.
export function invalidarConsultas() {
  for (const [clave, entrada] of entradas) {
    if (entrada.oyentes.size > 0 && entrada.consultar) {
      if (entrada.foto.estado !== 'cargando') {
        ejecutar(clave, entrada)
      }
    } else if (!entrada.controlador) {
      entradas.delete(clave)
    }
  }
}