// Se muestra cuando el navegador no permite registrar el service worker de MSW.
function SinApiSimulada() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <div role="alert" className="rounded-lg border border-error/40 bg-error/5 p-6">
        <h1 className="mb-2 text-xl font-bold text-error">No se pudo iniciar la API simulada</h1>
        <p className="mb-3">
          Este sitio obtiene sus datos desde un servidor simulado que funciona con un
          <em> service worker</em>, y este navegador no permitió registrarlo.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-texto-suave">
          <li>Si usas una ventana privada (por ejemplo, en Firefox), abre el sitio en una ventana normal.</li>
          <li>Revisa que el navegador no tenga bloqueados los service workers o las cookies para este sitio.</li>
        </ul>
      </div>
    </main>
  )
}

export default SinApiSimulada