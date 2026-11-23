const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

export function formatearPrecio(valor) {
  return formatoCLP.format(valor)
}

// Las fechas vienen como "AAAA-MM-DD". Se interpretan en UTC para que la zona horaria
// del navegador no corra el día.
const formatoFecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatearFecha(iso) {
  return formatoFecha.format(new Date(`${iso}T00:00:00Z`))
}

const MS_POR_DIA = 24 * 60 * 60 * 1000

export function diasEntre(desdeIso, hastaIso) {
  return Math.round((Date.parse(hastaIso) - Date.parse(desdeIso)) / MS_POR_DIA)
}

const reglasPlural = new Intl.PluralRules('es-CL')

export function pluralizar(cantidad, singular, plural) {
  const palabra = reglasPlural.select(cantidad) === 'one' ? singular : plural
  return `${cantidad} ${palabra}`
}

// "Río" y "rio" deben coincidir al buscar: se quitan tildes y mayúsculas.
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}