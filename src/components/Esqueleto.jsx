// Bloques grises con la forma del contenido que viene: la página no "salta" al llegar los datos.
// aria-hidden: son decorativos; el estado lo comunica AvisoCarga y aria-busy en la región.

export function Bloque({ className = '' }) {
  return <div className={`animate-pulse rounded bg-borde motion-reduce:animate-none ${className}`} />
}

export function EsqueletoTarjetas({ cantidad = 6 }) {
  return (
    <ul aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cantidad }, (_, i) => (
        <li key={i} className="rounded-lg border border-borde bg-superficie p-4">
          <Bloque className="mb-2 h-6 w-2/3" />
          <Bloque className="mb-4 h-4 w-1/3" />
          <div className="flex flex-wrap gap-2">
            <Bloque className="h-6 w-24" />
            <Bloque className="h-6 w-20" />
            <Bloque className="h-6 w-28" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function EsqueletoFilas({ cantidad = 3 }) {
  return (
    <ul aria-hidden="true" className="space-y-3">
      {Array.from({ length: cantidad }, (_, i) => (
        <li key={i} className="rounded-lg border border-borde bg-superficie p-4">
          <Bloque className="mb-2 h-5 w-1/2" />
          <Bloque className="mb-2 h-4 w-3/4" />
          <Bloque className="h-4 w-1/4" />
        </li>
      ))}
    </ul>
  )
}

export function EsqueletoEncabezado() {
  return (
    <div aria-hidden="true" className="mb-6">
      <Bloque className="mb-2 h-8 w-1/3" />
      <Bloque className="mb-4 h-4 w-1/5" />
      <Bloque className="mb-2 h-4 w-full max-w-2xl" />
      <Bloque className="h-4 w-2/3 max-w-xl" />
    </div>
  )
}