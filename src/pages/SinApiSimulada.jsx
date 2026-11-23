// Respaldo por si MSW no logra iniciar (por ejemplo, si no se puede cargar mockServiceWorker.js).
function SinApiSimulada() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div role="alert" className="rounded-lg border border-error/40 bg-error/5 p-6">
        <h1 className="mb-2 text-xl font-bold text-error">No se pudo iniciar la API simulada</h1>
        <p className="mb-3">
          Este sitio obtiene sus datos desde un servidor simulado que se carga en el navegador,
          y no fue posible iniciarlo.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-texto-suave">
          <li>Recarga la página.</li>
          <li>Si el problema continúa, revisa la consola del navegador (F12) para ver el detalle del error.</li>
        </ul>
      </div>
    </main>
  )
}

export default SinApiSimulada